const Application = require('../models/application');

async function allApplications(req, res) {
    const applications = await Application.findAll({
        where: {}
    });
    res.send(applications);
}

module.exports = { allApplications };