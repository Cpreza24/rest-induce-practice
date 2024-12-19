const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

//Validation
router.post('/sign-up', async (req, res) => {
    // Checks to see if the username is available
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send('username taken');
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Password and Confirm password must match');
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.send(`thanks for signing up ${user.username}`);
});

module.exports = router;
