const User = require('../models/user');
const Application = require('../models/application');

async function applicationForm(req, res) {
    try {
        const data = req.body;
        console.log(data);
        const { email } = req.body;

        //Find the user using the email
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        //If user data exists
        if (user) {
            data.user_id = user.id;
            // res.send(data); 
            const application = await Application.create(data);
            console.log("Form submitted successfully");
            res.send("Form submitted successfully");
        }

        //If the user data doesn't exist
        else {
            return res.status(401).send("No user found");
        }
    }
    catch (e) {
        console.log("Error in submitting form");
        console.log(e.message);
        res.send("Error in submitting form");
    }
}

async function applicationStatus(req, res) {
    try {
        const { email } = req.query;
        
        //Find the user using the email 
        const application = await Application.findAll({
            where: {
                email: email
            }
        });
        const data = [];
        const len = Object.keys(application).length;
        for (let i = 0; i < len; i++) {
            data.push({
                id: application[i].id,
                submission_date: application[i].submission_date,
                due_date: application[i].due_date,
                status: application[i].status,
                comments: application[i].comments,
                actin_date: application[i].action_date,
                forwarded_to: application[i].forwarded_to
            })
        }
        res.send(data);
    }
    catch (e) {
        res.send(e.message);
    }
}

module.exports = { applicationForm, applicationStatus }