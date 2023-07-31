const express = require('express');
const skillController = require('../controllers/skills.controller');
const router = express.Router();

router.get('/skill-levels', skillController.getAllSkills);
router.get('/get-skill/:skillId', skillController.findSkill);

module.exports = router;