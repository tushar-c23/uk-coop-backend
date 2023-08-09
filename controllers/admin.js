const Application = require('../models/application');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

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

async function registerAdmin(req, res) {
    try {
        const { username, password, mobile_number, role, district } = req.body;
        const data = {
            username,
            password: await bcrypt.hash(password, 12),
            mobile_number,
            role,
            district
        }
        const newAdmin = await Admin.create(data);
        console.log(role+" created successfully");
        res.send({
            status: 200,
            message: role+" created successfully"+ district? " in "+district : "",
            data: newAdmin,
        });
    } catch (e) {
        console.log("Error in registering admin");
        console.log(e.message);
        res.send("Error in registering admin");
    }
}

async function loginAdmin(req, res) {
    try {
        const { username, password } = req.body;

        const logAdmin = await Admin.findOne({
            where: {
                username: username
            }
        });

        //if username is found, compare password with bcrypt
        if (logAdmin) {
            const isSame = await bcrypt.compare(password, logAdmin.password);
            if (isSame) {
                res.send({
                    status: 200,
                    message: logAdmin.role + "Admin logged in successfully",
                    data: logAdmin,
                });
            }
            else {
                return res.status(401).send("Authentication failed");
            }
        }
        else {
            return res.status(401).send("Authentication failed");
        }

    }
    catch (e) {
        console.log(e.message);
    }
}

module.exports = { allApplications, singleApplication, applicationStatus, applicationsInDistrict, registerAdmin, loginAdmin };