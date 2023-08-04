const db = require('../database/database');
const { handleDatabaseResponse } = require('../helpers/utils')

function getAllSkills(req, res) {
    db.query('SELECT skill_level_id, skill_name FROM skill_levels', (error, results) => {
        handleDatabaseResponse(res, error, results);
        // if (error) {
        //     return res.status(500).json(error);
        // } else
        //     return res.status(200).json(results);
    });
}

function getSkill (req, res){
    const skill_level_id = req.params.skillId;

    db.query('SELECT skill_name FROM skill_levels WHERE skill_level_id = ?', [skill_level_id], (error, results) => {
        handleDatabaseResponse(res, error, results[0])
        // if (error) {
        //     return res.status(500).json(error);
        // } else
        //     return res.status(200).json(results[0]);
    });
}

module.exports = {
    getAllSkills: getAllSkills,
    getSkill: getSkill
}