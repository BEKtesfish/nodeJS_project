import express from 'express';
import {controller} from '../../controller/userController.js'
export const router = express.Router();

router.get('/login', controller.login);
router.post('/login/:password', controller.validateLogin);
router.get('/login/:id',controller.getUser);