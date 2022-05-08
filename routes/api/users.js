const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/users');

// @route  POST api/users
// @desc   regesiter new user
// @access public

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    //validation to see if all feilds entered
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    //check if user already exists
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'user already exists' })

            console.log('new user')
            const newUser = new User({
                name,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
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
            })

        })
})


module.exports = router;