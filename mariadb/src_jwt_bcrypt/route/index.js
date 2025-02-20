import express from 'express';
import {router as jwsRouter} from './jwtRoute.js'
import {router as pageRouter} from './pageRoute.js'
export const router = express.Router();

router.use('/',pageRouter)
router.use('/v1/api',jwsRouter);