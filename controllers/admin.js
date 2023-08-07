const Application = require('../models/application');

async function allApplications(req, res) {
    try {
        const applications = await Application.findAll({
            where: {}
        });
        res.send(applications);
        console.log("All applications fetched successfully");
    }
    catch (e) {
        res.send("All application fetch failed");
        console.log(e.message);
    }
}

async function singleApplication(req, res) {
    try {
        const { id } = req.params;
        const application = await Application.findOne({
            where: {
                id: id
            }
        });
        const data = {
            id: application.id,
            submission_date: application.submission_date,
            due_date: application.due_date,
            status: application.status
        };
        res.send(data);
        console.log("Single application fetched successfully");
    }
    catch (e) {
        res.send("Single application fetch failed");
        console.log(e.message);
    }
}

async function applicationStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Application.update(
            {
                status: status,
            },
            {
                where: { id: id }
            }
        )
        res.redirect(`/admin/applications/${id}`);
        console.log("Status updated successfully");       
    }
    catch (e) {
        res.send("Staus updated failed");
        console.log(e.message);
    }
}

async function applicationsInDistrict(req,res) {
    try {
        const { district } = req.body;
        const applications = await Application.findAll({
            where: {
                promoter_district: district
            }
        });
        res.send(applications);
    }
    catch(e) {
        res.send("Error in fetching applications in district");
        console.log(e.message);
    }
}

module.exports = { allApplications, singleApplication, applicationStatus, applicationsInDistrict };