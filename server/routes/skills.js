const express = require('express');
const skillController = require('../controllers/skills.controller');
const checkAuthMiddleware = require('../middleware/authentication');
const router = express.Router();

router.get('/skill-levels', checkAuthMiddleware.checkAuth, skillController.getAllSkills);

module.exports = router;