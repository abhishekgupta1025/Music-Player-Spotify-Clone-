import express from 'express';
import { listSong, scanLibrary } from '../controllers/songController.js';

const songRouter = express.Router();

songRouter.get('/list', listSong);
songRouter.get('/scan', scanLibrary);

export default songRouter;