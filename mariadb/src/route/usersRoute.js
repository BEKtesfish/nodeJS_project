import {UserController} from '../controller/UserControllerExpress.js';
import express from 'express';

export const router = express.Router();

router.param("id", UserController.verifyId)


router.get('/users', UserController.showUsers)
router.get('/users/:id', UserController.showUser)
router.delete('/users/:id', UserController.deleteUser)
router.patch('/users/:id', UserController.updateUser)
router.post('/users', UserController.addUser)
router.get('/search', UserController.searchUser)