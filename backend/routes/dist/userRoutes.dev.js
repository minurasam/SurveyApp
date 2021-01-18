"use strict";

var express = require('express');

var userController = require('./../controllers/userController');

var authController = require('./../controllers/authController');

var router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotpassword', authController.forgotpassword);
router.put('/resetpassword/:resetToken', authController.resetpassword);
router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).post(userController.updateUser)["delete"](userController.deleteUser);
module.exports = router;