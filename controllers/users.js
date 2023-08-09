const User = require('../models/user');
const bcrypt = require('bcrypt');
/**
 * 
 * @param { email, password, mobile_number} req 
 * @param { User, message, status} res
 * @description Register a user via simple push data to DB
 * @returns "User created successfully" || "Error in registering user"
 * @todo Add regex verification for email and mobile_number
 * @todo Add password hashing 
 */
async function registerUser(req, res) {
    try {
        const { email, password, mobile_number } = req.body;
        const data = {
            email,
            password: await bcrypt.hash(password, 12),
            mobile_number
        }
        const user = await User.create(data);
        console.log("User created successfully");
        res.send({
            status: 200,
            message: "User created successfully",
            data: user,
        });
    } catch (e) {
        console.log("Error in registering user");
        console.log(e.message);
        res.send("Error in registering user");
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                res.send({
                    status: 200,
                    message: "User logged in successfully",
                    data: user,
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
module.exports = { registerUser, loginUser }