import express from 'express';
import {router as jwsRouter} from './jwtRoute.js'
export const router = express.Router();

router.use('/v1',jwsRouter);