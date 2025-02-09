import express from 'express';
import {router} from './route/index.js';
export const app = express();

app.use('/', router)
app.get('/', (req, res) => {
    res.send('Hello World!');
})