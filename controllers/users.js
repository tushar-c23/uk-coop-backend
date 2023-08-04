const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * 
 * @param {*} req 
 * @param {*} res
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
        res.send("User created successfully");
    } catch (e) {
        console.log("Error in registering user");
        console.log(e.message);
        res.send("Error in registering user");
    }
}

module.exports = { registerUser }