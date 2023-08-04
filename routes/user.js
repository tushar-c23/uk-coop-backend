const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

//Route for user signup
router.route('/signup')
    .post(users.registerUser);

//Route for user login
router.route('/login')
    .post(users.loginUser);

module.exports = router;