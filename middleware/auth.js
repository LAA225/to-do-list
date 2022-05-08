const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // if no token. means user is not logged / registered
    if (!token) return res.status(401).json({ msg: "Authorization required for this task. Kindly log in" })

    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //if authentic, add user to request to get the id stored in token for further use
        req.user = decoded;
        next();

    } catch (error) {
        // the token was not valid. could be a login issue or token expired
        res.status(400).json({ msg: 'kindly log in again' })
    }

}

module.exports = auth;