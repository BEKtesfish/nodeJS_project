import express from 'express';
import {UserController} from "../controller/jwtController.js"
import {tokenMiddleware} from "../middleware/jwt.js"
export const router = express.Router();

router.post('/users',UserController.addUser)
router.post('/login' , UserController.login)
router.get('/users' , UserController.showUsers)
router.delete('/users' , UserController.deleteAllUser)
router.get('/token', tokenMiddleware.jwtTokenValidation, UserController.token)
