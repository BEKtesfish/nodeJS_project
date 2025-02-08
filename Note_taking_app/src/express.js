import express from  'express';
import {router} from './route/index.js';
export const app = express();
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}) );
app.use(express.static("public"))
app.use('/', router)