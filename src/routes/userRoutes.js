import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser); // POST http://localhost:4000/api/user/register
userRouter.post('/login', loginUser);       // POST http://localhost:4000/api/user/login

export default userRouter;