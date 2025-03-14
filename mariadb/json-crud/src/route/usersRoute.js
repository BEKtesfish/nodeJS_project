import express from 'express'
import controller from '../controller/UsersController.js';
import {auth} from "../middleware/authenticationMiddleware.js";

export const router = express.Router()

// create user post and get
router.get('/',auth.skippLoging ,(req,res,next) => controller.frontPage(req,res,next))
router.get('/users/admin', auth.hasRoleAdminOrForbidden, (req, res, next) => controller.getAllUsers(req, res, next))
router.get('/users/search',auth.isAuthenticatedOrRedirectedLogin,(req, res, next) => controller.searchUser(req, res, next))
router.get('/users/create', (req, res, next) => controller.createUser(req, res, next))
router.post('/users/create', (req, res, next) => controller.createUserPost (req, res, next))
router.get('/users/login', (req, res, next) => controller.login(req, res, next))
router.get('/users/logout',auth.isAuthenticatedOrRedirectedLogin, (req, res, next) => controller.logout(req, res, next))
router.param('id', (req, res, next, id) => controller.verifyUserId(req, res, next, id))

//get users and user by id
router.get('/users/admin', auth.isAuthenticatedOrRedirectedLogin, (req, res, next) => controller.getAllUsers(req, res, next))
router.get('/users/:id',auth.isAuthenticatedOrRedirectedLogin,(req, res, next) => controller.getUser(req, res, next))



router.get('/users/:id/update',auth.isAuthenticatedOrRedirectedLogin, (req, res, next) => controller.updateUser(req, res, next))

// router.get('/users/:id', (req, res, next) => controller.getUserById(req, res, next))
router.post('/users/:id/update',  auth.isAuthenticatedOrRedirectedLogin,(req, res, next) => controller.updateUserPost(req, res, next))



// router.delete('/users', (req, res, next) => controller.deleteUsers(req, res, next))
router.get('/users/:id/delete', auth.isAuthenticatedOrRedirectedLogin,(req, res, next) => controller.deleteUser(req, res, next))
router.post('/users/:id/delete',auth.isAuthenticatedOrRedirectedLogin, (req, res, next) => controller.deleteUserPost(req, res, next))
router.delete('/users/All',  auth.hasRoleAdminOrForbidden, (req, res, next) => controller.deleteAllUsers(req, res, next))


router.post('/users/login', (req, res, next) => controller.loginPost(req, res, next))
router.get('/users/:id/changepassword',auth.isAuthenticatedOrRedirectedLogin, (req, res, next) => controller.changePassword(req, res, next))
router.post('/users/:id/changepassword', auth.isAuthenticatedOrRedirectedLogin,(req, res, next) => controller.changePasswordPost(req, res, next))



