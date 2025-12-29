import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Automatically loads .env
import connectDB from './src/db/connect.js';
import userRouter from './src/routes/userRoutes.js';//import userRouter
import songRouter from './src/routes/songRoute.js';//import songRouter
import path from 'path';

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(cors()); // Allow all cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads
app.use('/api/user', userRouter);//use the userRouter for all routes starting with /api/user
app.use('/api/song', songRouter);//use the songRouter for all routes starting with /api/song
app.use('/uploads', express.static('src/uploads'));//serve files from the uploads folder

// Simple test route
app.get('/', (req, res) => res.send('API Working'));

app.listen(port, () => console.log(`Server started on port ${port}`));