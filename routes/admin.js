const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

router.route('/register')
    .post(admin.registerAdmin);

router.route('/login')
    .post(admin.loginAdmin);

router.route('/applications/all')
    .get(admin.allApplications);

router.route('/applications')
    .get(admin.applicationsInDistrict);

router.route('/applications/:id')
    .get(admin.singleApplication);

router.route('/applications/:id')
    .post(admin.applicationStatus);

router.route('/application/role')
    .get(admin.allApplicationsByRole)

module.exports = router;