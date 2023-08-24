const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URI);
const User = require('./user');
const Admin = require('./admin');

// Possible bifercation of promoter possible, but not required as of now
//TODO: Add all districts and others
const districts = ["Almora", "Nainital", "Chamoli", "Dehradun", "Haridwar", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi", "Champawat", "Bageshwar"];
const society_types = ["Deendayal", "Cooperative Deal Plan", "Fisheries", "Dairy", "Sheep & Goat", "Autonomous"];
const divisions = ["Kumaon", "Garhwal"];
const adminRoles = ['master_admin', 'district_admin', 'assistant_registrar', 'division_admin', 'registrar'];

const Application = sequelize.define('Application', {
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
        isEmail: true,
        get() {
            return this.getDataValue('email');
        },
        set(value) {
            this.setDataValue('email', value);
        }
    },
    mobile_number: {
        type: DataTypes.BIGINT(10),
        allowNull: false,
        isNumeric: true,
        len: [10],
        get() {
            return this.getDataValue('mobile_number');
        },
        set(value) {
            this.setDataValue('mobile_number', value);
        }
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        isUUID: 4
    },
    society_type: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [society_types],
        get() {
            return this.getDataValue('society_type');
        },
        set(value) {
            this.setDataValue('society_type', value);
        }
    },
    discipline: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('discipline');
        },
        set(value) {
            this.setDataValue('discipline', value);
        }
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
            return this.getDataValue('level');
        },
        set(value) {
            this.setDataValue('level', value);
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('name');
        },
        set(value) {
            this.setDataValue('name', value);
        }
    },
    address: {
        type: DataTypes.STRING(1234),
        allowNull: false,
        get() {
            return this.getDataValue('address');
        },
        set(value) {
            this.setDataValue('address', value);
        }
    },
    division: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [divisions],
        get() {
            return this.getDataValue('division');
        },
        set(value) {
            this.setDataValue('division', value);
        }
    },
    area_of_operation: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('area_of_operation');
        },
        set(value) {
            this.setDataValue('area_of_operation', value);
        }
    },
    block: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('block');
        },
        set(value) {
            this.setDataValue('block', value);
        }
    },
    pincode: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        get() {
            return this.getDataValue('pincode');
        },
        set(value) {
            this.setDataValue('pincode', value);
        }
    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('landmark');
        },
        set(value) {
            this.setDataValue('landmark', value);
        }
    },
    name_of_promoter: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('name_of_promoter');
        },
        set(value) {
            this.setDataValue('name_of_promoter', value);
        }
    },
    promoter_email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        get() {
            return this.getDataValue('promoter_email');
        },
        set(value) {
            this.setDataValue('promoter_email', value);
        }
    },
    promoter_district: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [districts],
        get() {
            return this.getDataValue('promoter_district');
        },
        set(value) {
            this.setDataValue('promoter_district', value);
        }
    },
    promoter_address: {
        type: DataTypes.STRING(1234),
        allowNull: true,
        get() {
            return this.getDataValue('promoter_address');
        },
        set(value) {
            this.setDataValue('promoter_address', value);
        }
    },
    promoter_mobile_number: {
        type: DataTypes.BIGINT(10),
        allowNull: false,
        isNumeric: true,
        get() {
            return this.getDataValue('promoter_mobile_number');
        },
        set(value) {
            this.setDataValue('promoter_mobile_number', value);
        }
    },
    promoter_landmark: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('promoter_landmark');
        },
        set(value) {
            this.setDataValue('promoter_landmark', value);
        }
    },
    challan_number: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('challan_number');
        },
        set(value) {
            this.setDataValue('challan_number', value);
        }
    },
    document_link: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('document_link');
        },
        set(value) {
            this.setDataValue('document_link', value);
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
        get() {
            return this.getDataValue('status');
        },
        set(value) {
            this.setDataValue('status', value);
        }
    },
    approved_by: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Admin,
            key: 'id'
        },
        isUUID: 4
    },
    forwarded_to: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "assistant_registrar",
        isIn: [adminRoles],
        get() {
            return this.getDataValue('forwarded_to');
        },
        set(value) {
            this.setDataValue('forwarded_to', value);
        }
    },
    submission_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
            return this.getDataValue('submission_date');
        }
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true,
        get() {
            return this.getDataValue('due_date');
        },
        set(value) {
            this.setDataValue('due_date', value);
        }
    }
})

Application.sync({ alter: true }).then(
    () => console.log("Applications table synced successfully")
);

module.exports = Application;