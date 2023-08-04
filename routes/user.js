const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.route('/signup')
    .post(users.registerUser);

router.route('/login')
    .post(users.loginUser);

module.exports = router;