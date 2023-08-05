const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

router.route('/applications')
    .get(admin.allApplications);

module.exports = router;