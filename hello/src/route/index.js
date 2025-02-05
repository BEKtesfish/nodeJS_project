import {router as helloRouter} from './hello.js'
import {router as usersRouter} from './users.js'
import express from 'express'
export const router = express.Router()
router.use('/',helloRouter)   
router.use('/api/v1',usersRouter)