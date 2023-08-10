const db = require('../database/database');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const uuid = require('uuid');

function register(req, res) {
    const { username, password } = req.body;

    db.query('SELECT username FROM users WHERE username = ?', [username], async (error, result) => {
        if (error) {
            res.status(500).json(error);
        }

        if (result.length > 0) {
            return res.status(400).json({
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

function generateAccessToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '7d' });
}

function login(req, res) {
    const { username, password } = req.body;

    db.query('SELECT id, username, password FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (results.length > 0) {
            bcryptjs.compare(password, results[0].password, (error, passwordResult) => {
                if (error) {
                    return res.status(500).json(error);
                }
                if (passwordResult) {
                    const user = {
                        id: results[0].id,
                        username: username
                    };

                    const refreshToken = generateRefreshToken(user);
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                    });

                    const accessToken = generateAccessToken(user);
                    return res.status(200).json({ token: accessToken });
                } else {
                    return res.status(401).json({ "message": 'Invalid credentials' });
                }
            });
        } else {
            return res.status(401).json({ "message": 'Invalid credentials' });
        }
    });
}

function logout(req, res) {
    res.clearCookie('refreshToken');
    // Send a success response
    res.status(200).json({ message: 'Logout successful' });
};


function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken
    try {
        let decodedRefreshToken
        jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.clearCookie('refreshToken');
            }else{
                decodedRefreshToken = user
            }
          });
        // Generate a new access token
        const user = {
            id: decodedRefreshToken.id,
            username: decodedRefreshToken.username,
        };
        const accessToken = generateAccessToken(user);

        // Send the new access token to the client
        return res.status(200).json({ token: accessToken });
    } catch (error) {
        // Handle token validation errors
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
}

function check_refresh_token (req, res) {
    const refreshToken = req.cookies.refreshToken;

    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            res.clearCookie('refreshToken');
        }
      });
      
    if (refreshToken) {
      // The refresh token exists in the cookie storage
      res.status(200).json({ hasRefreshToken: true });
    } else {
      // The refresh token does not exist in the cookie storage
      res.status(401).json({ hasRefreshToken: false });
    }
}


module.exports = {
    register: register,
    login: login,
    logout: logout,
    refreshToken: refreshToken,
    check_refresh_token: check_refresh_token
}