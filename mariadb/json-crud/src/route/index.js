import express from 'express'
import { router as usersRoute } from './usersRoute.js'
import {router as guessRoute} from './guessRoute.js';
import {router as utilsRoute} from './utilsRoute.js';

export const router = express.Router()

router.use('/guess',guessRoute)
router.use('/crud', usersRoute)
router.use('/utils',utilsRoute)
