const db = require('../database/database');

function getAllSkills(req, res) {
    // const skill_level_id = req.params.skillId;

    // db.query('SELECT skill_name FROM skill_levels WHERE skill_level_id = ?', [skill_level_id], (error, results) => {
    //     if (error) {
    //         res.status(500).json(error);
    //     } else
    //         res.status(200).json(results[0]);
    // });

    db.query('SELECT skill_level_id, skill_name FROM skill_levels', (error, results) => {
        if (error) {
            res.status(500).json(error);
        } else
            res.status(200).json(results);
    });
}

module.exports = {
    getAllSkills: getAllSkills,
}