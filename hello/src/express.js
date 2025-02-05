import express from 'express'
import {router} from './route/index.js'
import logger from "morgan"
import {errorHandler} from './middleware/errorHandler.js'
export const app = express()


app.use(express.json())
app.use('/', router)

app.use(logger('dev',{immediate:true}))

// Error for Handling 404
app.use(errorHandler.notFound)

//Global Error handler
app.use(errorHandler.errorDefualt)


