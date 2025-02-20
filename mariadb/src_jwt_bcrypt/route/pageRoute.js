import express from 'express';
import {tokenMiddleware} from "../middleware/jwt.js"
export const router = express.Router();

router.get('/',(req,res)=>{
    res.render('homePage')
})
router.get('/loginPage',(req,res)=>{
    res.render('loginPage')
})
router.get('/logoutPage',(req,res)=>{
    res.render('homePage')
})
router.get('/registerPage',(req,res)=>{
    res.render('registerPage')
})
router.get('/profilePage', tokenMiddleware.jwtTokenValidation, (req, res)=>{
    res.render('profilePage',{
        user : res.user
    })
})