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

/**
 * 
 * @param {*} body role,district
 * @returns {*} res - applications according to role
 */
async function allApplicationsByRole(req, res) {
    try {
        const admin_role = req.query.role;
        const district = req.query.district;
        const division = req.query.division;
        let applications = null;

        if(admin_role==="assistant_registrar"){     
            applications = await Application.findAll({
                where: {
                    district: district,
                    forwarded_to: "assistant_registrar"
                }
            });
        } else if(admin_role==="division_admin"){
            applications = await Application.findAll({
                where: {
                    division: division,
                    forwarded_to: "division_admin"
                }
            });
        } else {
            applications = await Application.findAll({
                where: {
                    forwarded_to: "registrar"
                }
            });
        }

        res.send({status:200,data: applications});
        console.log("All applications fetched successfully");
    }
    catch (e) {
        console.log('Error in fetching applications');
        res.send(e.message);
    }
}

/**
 * 
 * @param {*} req : query - applicationId 
 * @returns {*} res - single application 
 */
async function singleApplication(req, res) {
    try {
        const { id } = req.query;
        const application = await Application.findOne({
            where: {
                id: id
            }
        });
        // const data = {
        //     id: application.id,
        //     submission_date: application.submission_date,
        //     due_date: application.due_date,
        //     status: application.status
        // };
        res.send({ status: 200, message: "Application fetched Successfully", data: application });
        console.log("Single application fetched successfully");
    }
    catch (e) {
        res.send("Single application fetch failed");
        console.log(e.message);
    }
}

/**
 * 
 * @param {*} query applicationId
 * @param {*} req admin_role,admin_id,status, comments
 * @returns Status changed to ${status} of application id ${id} || Staus update failed
 * @notes Status can be Approved, Rejected, SentBack
 */
async function applicationStatus(req, res) {
    try {
        const { id } = req.query;
        const admin_role = req.body.role;
        const admin_id = req.body.id;
        const status = req.body.status;
        const comments = req.body.comments;
        let fulfilled = false;
        console.log(req.body.admin_role);
        console.log(req.body.admin_role === "assistant_registrar");
        if (status === "Rejected") {
            await Application.update(
                {
                    status: status,
                    approved_by: admin_id,
                    action_date: Date.now()
                },
                {
                    where: { id: id }
                }
            )
            fulfilled = true;
        }
        if (status === "SentBack") {
            await Application.update(
                {
                    status: status,
                    forwarded_to: Admin.findByPk(admin_id).role,
                    comments: comments,
                    action_date: Date.now()
                },
                {
                    where: { id: id }
                }
            )
            fulfilled = true;
        }
        if (status === "Approved") {
            if (admin_role === "assistant_registrar") {
                console.log("in assistant_registrar");
                await assistant_registrarApproval(id, admin_id);
                fulfilled = true;
            } else if (admin_role === "division_admin") {
                await division_adminApproval(id, admin_id);
                fulfilled = true;
            } else if (admin_role === "registrar") {
                await Application.update(
                    {
                        status: status,
                        approved_by: admin_id,
                        action_date: Date.now()
                    },
                    {
                        where: { id: id }
                    }
                )
                fulfilled = true;
            } else {
                console.log("Invalid role");
            }
        }
        if (!fulfilled) {
            res.send("Invalid status update");
        } else {
            res.send(`Status changed to ${status} of application id ${id}`);
            console.log("Status updated successfully");
        }
        // res.redirect(`/admin/applications/${id}`);
    }
    catch (e) {
        res.send("Staus update failed");
        console.log(e.message);
    }
}

async function assistant_registrarApproval(applicationId, admin_id) {
    let application = await Application.findByPk(applicationId);
    if (application.society_type !== "Autonomous") {
        application.approved_by = admin_id;
        application.forwarded_to = "division_admin";
        application.action_date = Date.now();
        application.save();
    } else {
        if (application.level === 1) {
            application.approved_by = admin_id;
            application.status = "Approved";
            application.action_date = Date.now();
            application.save();
        } else {
            application.approved_by = admin_id;
            application.forwarded_to = "division_admin";
            application.action_date = Date.now();
            application.save();
        }
    }
}

async function division_adminApproval(applicationId, admin_id) {
    let application = await Application.findByPk(applicationId);
    if (application.society_type !== "Autonomous") {
        if (application.level <= 2) {
            application.approved_by = admin_id;
            application.status = "Approved";
            application.action_date = Date.now();
            application.save();
        } else {
            application.approved_by = admin_id;
            application.forwarded_to = "registrar";
            application.action_date = Date.now();
            application.save();
        }
    } else {
        if (application.level === 2) {
            application.approved_by = admin_id;
            application.status = "Approved";
            application.action_date = Date.now();
            application.save();
        } else {
            application.approved_by = admin_id;
            application.forwarded_to = "registrar";
            application.action_date = Date.now();
            application.save();
        }
    }
}

/**
 * 
 * @param {*} req : query - district
 * @param {*} res : applications in district
 */
async function applicationsInDistrict(req, res) {
    try {
        const { district } = req.query;
        const applications = await Application.findAll({
            where: {
                promoter_district: district
            }
        });
        res.send(applications);
    }
    catch (e) {
        res.send("Error in fetching applications in district");
        console.log(e.message);
    }
}

async function registerAdmin(req, res) {
    try {
        const { username, password, mobile_number, role, district, division } = req.body;
        const data = {
            username,
            password: await bcrypt.hash(password, 12),
            mobile_number,
            role,
            district,
            division
        }
        const newAdmin = await Admin.create(data);
        console.log(role + " created successfully");
        res.send({
            status: 200,
            message: district ? role + " created successfully" + " in " + district : role + " created successfully",
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

module.exports = { allApplications, singleApplication, applicationStatus, applicationsInDistrict, registerAdmin, loginAdmin, allApplicationsByRole };