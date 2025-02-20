import express from 'express';
import {errorHandler} from './middleware/errorHandler.js';
import {router} from './route/index.js';
import helmet from 'helmet'
import logger from 'morgan';
import path from 'path';
export const app = express();

if( process.env.NODE_ENV !== 'test'){
    app.use(logger('dev',{ immediate:true }));
}

app.set('view engine', 'ejs');

app.set("views",path.join(__dirname, 'views'))

app.use(helmet());
app.disable('x-powered-by');
app.use(express.static('public'))
app.use(express.json());
app.use('/', router);

app.use(errorHandler.notFound)
app.use(errorHandler.errorDefualt)
