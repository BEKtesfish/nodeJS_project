import express from 'express';
import {errorHandler} from './middleware/errorHandler.js';
import {router} from './route/index.js';
export const app = express();

app.use(express.json());
app.use('/', router);

app.use(errorHandler.notFound)
app.use(errorHandler.errorDefualt)
