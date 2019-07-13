const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const UserAuthMiddleware = require('../middlewares/userAuth');

//subjects Routes
router.post('/user/signin', UserAuthMiddleware, UserController.signInUser);
router.post('/user/signup', UserController.signUpUser);

module.exports = router;
