const db = require('../database/database');
const Redis = require('redis')

const redisClient = Redis.createClient();
redisClient.connect();

async function getAllSkills(req, res) {
    let redisResult = await redisClient.get('skill_levels')
    if (redisResult) {
        const results = JSON.parse(redisResult);
        return res.status(200).json(results);
    } else {
        db.query('SELECT * FROM skill_levels', async (error, results) => {
            if (error) {
                return res.status(500).json(error);
            } else {
                await redisClient.set('skill_levels', JSON.stringify(results));
                redisClient.expire('skill_levels', 3600);
                return res.status(200).json(results);
            }
        })
    }
}

// function getSkill(req, res) {
//     const skill_level_id = req.params.skillId;

//     db.query('SELECT skill_name FROM skill_levels WHERE skill_level_id = ?', [skill_level_id], (error, results) => {
//         if (error) {
//             return res.status(500).json(error);
//         } else
//             return res.status(200).json(results[0]);
//     });
// }

module.exports = {
    getAllSkills: getAllSkills,
    // getSkill: getSkill
}