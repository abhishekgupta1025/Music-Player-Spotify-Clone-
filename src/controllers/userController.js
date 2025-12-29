import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//authentication for login and register in server side


// Helper: Create a Token (The "ID Badge") 
const createToken = (id) => {
    // encrypts the user ID into a token that expires in 3 days
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

// Logic: Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;//destructuring gets the name and emails from the data sent by the user 

        // 1. Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // 2. Check if password matches (Compare plain text vs Scrambled DB version)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // 3. Success! Give them a token
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error logging in" });
    }
}

// Logic: Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;//destructuring gets the name and emails from the data sent by the user 

        // 1. Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // 2. Validate email format & password strength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "password must be at least 8 characters long" });
        }

        // 3. Hash the password (Scramble it)
        const salt = await bcrypt.genSalt(10); // "Salt" adds randomness
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create and Save the User
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();

        // 5. Generate a token immediately so they are logged in
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error registering" });
    }
}

export { loginUser, registerUser };