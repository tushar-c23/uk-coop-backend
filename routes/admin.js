const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

router.route('/applications/all')
    .get(admin.allApplications);

router.route('/applications')
    .get(admin.applicationsInDistrict);

router.route('/applications/:id')
    .get(admin.singleApplication);

router.route('/applications/:id')
    .post(admin.applicationStatus);

module.exports = router;