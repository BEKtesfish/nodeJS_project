import express from 'express';
import {router as userRouter} from  './usersRoute.js';

export const router = express.Router();
router.use('/', userRouter)