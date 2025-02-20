import express from 'express';
import {router} from './route/index.js'
export const app = express();

app.use(express.json())
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.use('/', router);