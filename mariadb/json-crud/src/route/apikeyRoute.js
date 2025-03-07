import express from 'express';
import {controller } from '../controller/apikeyController';
import verifyApikey from '../middleware/apikey.js';

export const router = express.Router();

router.get('/apikey/list', controller.list)
router.get('/apikey/try1',controller.verifyQueryString)
router.post('/apikey/try2', controller.verifyHeader)
router.post('/apikey/try3', controller.verifyBody)
router.get('/apikey/try4', controller.magicAnswer)

router.get('/apikey/try5', verifyApikey, controller.magicAnswer)
router.post('/apikey/try5', verifyApikey, controller.magicAnswer)