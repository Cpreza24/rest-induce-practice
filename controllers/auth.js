const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

//Sign-Up Validation
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

// Sign-In Validation
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
});

//logic to check if a user exists and the password is correct
// router.post('/sign-in', async (req, res) => {
//     try {
//         const userInDatabase = await User.findOne({
//             username: req.body.username,
//         });
//         if (!userInDatabase) {
//             return res.send('Login failed. Please try again');
//         }

//         const validPassword = bcrypt.compareSync(
//             req.body.password,
//             userInDatabase.password
//         );
//         if (!validPassword) {
//             return res.send('login failed. please try again');
//         }
//         req.session.user = {
//             username: userInDatabase.username,
//             id: userInDatabase._id,
//         };

//         res.redirect('/');
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Internal server error');
//     }
// });

module.exports = router;
