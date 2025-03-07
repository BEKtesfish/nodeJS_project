import express from 'express'
import logger from 'morgan'
import path from 'path';
import session from 'express-session';
import { localsMiddleware} from './middleware/injectLocals.js'
import {sessionOptions} from './config/sessionOptions.js'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'
import expressLayouts from 'express-ejs-layouts'

export const app = express()

app.use(localsMiddleware.injectBaseUrl)
app.use(session(sessionOptions))
app.set('view engine', 'ejs')
app.set('views', path.join('src', 'views'))
app.set('layout',path.join('layout','default'));
app.use(expressLayouts)

app.use(localsMiddleware.injectBaseUrl)
app.use(localsMiddleware.flashMessage)


app.use(express.urlencoded({ extended: false }))
// Use the morgan logger
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev', { immediate: true }))
}

// Use the public folder for static resources
app.use(express.static('public'))

// Middleware to parse JSON data as part of the body
app.use(express.json())

// Mount the routes
app.use('/', router)

// Middleware för 404
app.use(errorHandler.notFoundDefault)

// Global felhanterare
app.use(errorHandler.errorDefault)
