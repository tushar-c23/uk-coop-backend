const express = require('express');
const router = express.Router();
const applications =require('../controllers/application');

// Post route to register user details
router.route('/register')
    .post(applications.applicationForm);

// Get route to fetch the application status of the user
 router.route('/status')
    .get(applications.applicationStatus);

module.exports= router;