const express = require('express');
const skillController = require('../controllers/skills.controller');
const checkAuthMiddleware = require('../middleware/authentication');
const router = express.Router();

router.get('/skill-levels', checkAuthMiddleware.checkAuth, skillController.getAllSkills);
router.get('/skill-level/:skillId', checkAuthMiddleware.checkAuth, skillController.getSkill);
module.exports = router;