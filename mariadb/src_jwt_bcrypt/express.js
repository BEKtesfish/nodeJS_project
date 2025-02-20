import express from 'express';
import {router} from './route/index.js'
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser'
export const app = express();
const __fileName= fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs")
app.set('views',path.join(__dirName,'views'))
app.use(cookieParser());
app.get('/hello', (req, res) => {
    res.render("homePage")
});

app.use('/', router);