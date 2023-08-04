const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

// router.route('/login');

router.route('/signup')
    .post(users.registerUser);

module.exports = router;