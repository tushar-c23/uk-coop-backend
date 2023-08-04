const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/uk_coop_be'); //db_uri --Tushar

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
        type: DataTypes.INTEGER(10),
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
User.sync().then(
    () => console.log("User table created successfully")
);

module.exports = User;