import {router as helloRouter} from './hello.js'

import express from 'express'
export const router = express.Router()
router.use('/',helloRouter)   
