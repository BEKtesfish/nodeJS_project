import express from 'express';
import controller from '../controller/AdminController.js';
import {auth} from '../middleware/authenticationMiddleware.js';

export const router = express.Router();
router.get('/', auth.hasRoleAdminOrForbidden, controller.viewAllUsers)