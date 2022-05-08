const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/users');

// @route  POST api/auth
// @desc   authenicate user
// @access public

router.post('/', (req, res) => {
    const { email, password } = req.body;

    //validation to see if all feilds entered
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    //check if user already exists
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'user doesnot exist' })

            //validate password
            bcrypt.compare(password, user.password)
                .then(Match => {
                    if (!Match) return res.status(400).json({ msg: "invalid credentials" })
                })

            jwt.sign(
                { id: user.id }, //any payload we wanna attach to the token
                config.get('jwtSecret'), //the secret key
                { expiresIn: 7200 },
                (err, token) => {
                    if (err) throw err;

                    res.json({
                        'user': {
                            'name': user.name,
                            'id': user.id,
                            'email': user.email
                        },
                        token
                    });
                }
            )

        })
})

// @route  GET api/auth/user
// @desc   get user data
// @access private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

module.exports = router;