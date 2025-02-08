import {router as notes_route} from './noteApp.js';
import express from 'express';
export const router = express.Router();

router.use('/',notes_route);