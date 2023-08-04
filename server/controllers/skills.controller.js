const db = require('../database/database');
const { handleDatabaseResponse } = require('../helpers/utils')
const Redis = require('redis')

const redisClient = Redis.createClient();

function getAllSkills(req, res) {

    db.query('SELECT skill_level_id, skill_name FROM skill_levels', (error, results) => {
        // handleDatabaseResponse(res, error, results);
        if (error) {
            return res.status(500).json(error);
        } else {

            return res.status(200).json(results);
        }
    });
}


// function getAllSkills(req, res) {
//     // Check if the data is available in Redis
//     redisClient.get('skill_levels', (error, redisResult) => {
//         if (redisResult) {
//             // Data is available in Redis, parse it and return it
//             const results = JSON.parse(redisResult);
//             return res.status(200).json(results);
//         } else {
//             // Data is not available in Redis, query the database
//             db.query('SELECT skill_level_id, skill_name FROM skill_levels', (error, results) => {
//                 if (error) {
//                     return res.status(500).json(error);
//                 } else {
//                     // Store the result in Redis for future use
//                     redisClient.set('skill_levels', JSON.stringify(results));
//                     // Set an expiration for the cached data, for example, 1 hour (3600 seconds)
//                     redisClient.expire('skill_levels', 3600);
//                     return res.status(200).json(results);
//                 }
//             });
//         }
//     });
// }


function getSkill(req, res) {
    const skill_level_id = req.params.skillId;

    db.query('SELECT skill_name FROM skill_levels WHERE skill_level_id = ?', [skill_level_id], (error, results) => {
        // handleDatabaseResponse(res, error, results[0])
        if (error) {
            return res.status(500).json(error);
        } else
            return res.status(200).json(results[0]);
    });
}

module.exports = {
    getAllSkills: getAllSkills,
    getSkill: getSkill
}