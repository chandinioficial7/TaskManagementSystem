const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: 'User Registered Successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User Not Found'
            });
        }

        if (user.password !== password) {
            return res.status(400).json({
                message: 'Invalid Password'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            'mysecretkey',
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login Successful',
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;