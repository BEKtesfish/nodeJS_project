import express from 'express'
import controller from '../controller/UsersController.js';

export const router = express.Router()

// create user post and get
router.get('/users/search', middleware.isAuthenticatedOrRedirectLogin,(req, res, next) => controller.searchUser(req, res, next))
router.get('/users/create', auth.hasRoleAdminOrForbidden,(req, res, next) => controller.createUser(req, res, next))
router.post('/users/create',auth.hasRoleAdminOrForbidden, (req, res, next) => controller.createUserPost (req, res, next))
router.get('/users/login', (req, res, next) => controller.login(req, res, next))
router.param('id', (req, res, next, id) => controller.verifyUserId(req, res, next, id))

//get users and user by id
router.get('/users',middleware.isAuthenticatedOrRedirectLogin, (req, res, next) => controller.getAllUsers(req, res, next))
router.get('/users/:id',middleware.isAuthenticatedOrRedirectLogin, (req, res, next) => controller.getUser(req, res, next))



router.get('/users/:id/update',auth.hasRoleAdminOrForbidden, (req, res, next) => controller.updateUser(req, res, next))

// router.get('/users/:id', (req, res, next) => controller.getUserById(req, res, next))
router.post('/users/:id/update', auth.hasRoleAdminOrForbidden, (req, res, next) => controller.updateUserPost(req, res, next))



// router.delete('/users', (req, res, next) => controller.deleteUsers(req, res, next))
router.get('/users/:id/delete',auth.hasRoleAdminOrForbidden, (req, res, next) => controller.deleteUser(req, res, next))
router.post('/users/:id/delete', auth.hasRoleAdminOrForbidden,(req, res, next) => controller.deleteUserPost(req, res, next))
router.delete('/users/All', auth.hasRoleAdminOrForbidden, (req, res, next) => controller.deleteAllUsers(req, res, next))


router.post('/users/login', (req, res, next) => controller.loginPost(req, res, next))
router.get('/users/:id/changepassword',middleware.isAuthenticatedOrRedirectLogin, (req, res, next) => controller.changePassword(req, res, next))
router.post('/users/:id/changepassword',middleware.isAuthenticatedOrRedirectLogin, (req, res, next) => controller.changePasswordPost(req, res, next))



