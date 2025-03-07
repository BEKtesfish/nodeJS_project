import express from 'express'
import { router as usersRoute } from './usersRoute.js'
import {router as guessRoute} from './guessRoute.js';

export const router = express.Router()
router.use('/guess',guessRoute)
router.use('/crud', usersRoute)
