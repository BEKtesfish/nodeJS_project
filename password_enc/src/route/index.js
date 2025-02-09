import {router as myappRouter} from './myapp.js';

import express from 'express';

export const router = express.Router();

router.use('/',myappRouter);