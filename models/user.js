const env = require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URI, {
    dialect: 'postgres'
});

const districts = ["Almora", "Nainital", "Chamoli", "Dehradun", "Haridwar", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi", "Champawat", "Bageshwar"];

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        get() {
            return this.getDataValue('id');
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        get() {
            return this.getDataValue('email');
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('password');
        },
        set(value) {
            this.setDataValue('password', value);
        }
    },
    mobile_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
        isNumeric: true,
        get() {
            return this.getDataValue('mobile_number');
        },
        set(value) {
            this.setDataValue('mobile_number', value);
        }
    }
});

// TODO: Call this efficiently
User.sync({force: true}).then(
    () => console.log("User table created successfully")
);

module.exports = User;