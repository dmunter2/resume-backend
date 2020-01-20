const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../config/secrets')


module.exports = (req, res, next) => {

    const token = req.headers.authorization


    if (token) {
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Cant pass - restricted Middleware " })
            } else {
                req.decodedJwt = decodedToken
                next();

            }
        })

    } else {
        res.status(400).json({ message: "Cant recieve info" })

    }
}
