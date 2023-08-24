const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

router.route('/register')
    .post(admin.registerAdmin);

router.route('/login')
    .post(admin.loginAdmin);

router.route('/applications/all')
    .get(admin.allApplications);

router.route('/applications/district')
    .get(admin.applicationsInDistrict);

router.route('/application')
    .get(admin.singleApplication);

router.route('/application')
    .post(admin.applicationStatus);

router.route('/applications/role')
    .get(admin.allApplicationsByRole)

module.exports = router;