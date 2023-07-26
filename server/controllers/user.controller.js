const db = require('../database/database');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const uuid = require('uuid');



/**
 * Επειδή η διαδικασία του για το hashing του κωδικού μπορεί να πάρει λίγο παραπάνω
 * χρόνο από ότι θέλει η διαδικασία εκτέλεσης του κώδικα χρησιμοποιούμε το await και async
 *  
 */
function register(req, res) {
    //Destructuring
    /**
     * είναι το ίδιο πράγμα αν έκανα: 
     * const username = req.body.username;
     * const password = req.body.password;
     */
    const { username, password } = req.body;

    db.query('SELECT username FROM users WHERE username = ?', [username], async (error, result) => {
        if (error) {
            res.status(500).json(error);
        }

        if (result.length > 0) {
            return res.json({
                "message": "That username is already exists."
            });
        }

        let hashedPassword = await bcryptjs.hash(password, 10)
        const id = uuid.v4();

        db.query('INSERT INTO users SET ?', { id: id, username: username, password: hashedPassword }, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.status(200).json({
                    "message": "User registered successfully."
                })
            }
        })
    })
}

function login(req, res) {
    const { username, password } = req.body;

    db.query('SELECT id, username, password FROM users WHERE username = ?', [username], (error, results) => {

        if (error) {
            res.status(500).json(error);
        }

        if (results.length > 0) {
            bcryptjs.compare(password, results[0].password, (error, passwordResult) => {
                if (error) {
                    res.status(500).json(error);
                }
                if (passwordResult) {
                    const user = {
                        id: results[0].id,
                        username: username
                    };

                    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '7d' })
                    res.cookie("refreshToken", token, {

                        httpOnly: true,

                        secure: process.env.NODE_ENV === "production",

                        sameSite: "strict",

                    });

                    const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' }, (error, token) => {
                        res.status(200).json({
                            token: token
                        })
                    })


                } else {
                    res.status(401).json({
                        "message": "Invalid credentials"
                    });
                }
            })
        } else {
            res.status(401).json({
                "message": "Invalid credentials"
            });
        }
    });
}
module.exports = {
    register: register,
    login: login
}