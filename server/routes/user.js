const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logout)
router.get('/check-refresh-token', userController.checkRefreshToken)

module.exports = router;