import {UserController} from '../controller/UserControllerExpress.js';
import express from 'express';
import verifyApiKey from '../middleware/apiMiddleware.js';

export const router = express.Router();

router.param("id", UserController.verifyId)


router.get('/users', UserController.showUsers)
router.get('/users/:id', UserController.showUser)
router.delete('/users/:id', UserController.deleteUser)
router.delete('/users', UserController.deleteAllUser)
router.patch('/users/:id', UserController.updateUser)
router.post('/users', UserController.addUser)
router.get('/search', UserController.searchUser)
router.post('/api/v1/apikey/try2', UserController.verifyHeader)
router.post('/api/v1/apikey/try3', UserController.verifyBody)
router.post('/try5', verifyApiKey ,UserController.verifyApiMeddleware)
router.get('/try5', verifyApiKey ,UserController.verifyApiMeddleware)