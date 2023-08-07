const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');

const userRoutes = require('./routes/user');
const applicationRoutes=require('./routes/application');
const adminRoutes=require('./routes/admin');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/uk_coop_be'); //db_uri --Tushar | Comment this when not required
const User = require('./models/user');

//DB Connection test to be moved to utils
async function dbTest() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
dbTest();

//DB Sync to be moved to utils CAREFULL NOT TO BE CALLED IN PRODUCTION
// TODO: Remove alter: true in production, add regex verification later for production db. "Ensure production db with proper suffix"
async function dbSync() {
    try {
        // await sequelize.sync({ alter: true });
        await User.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync the models:', error);
    }
}
dbSync();

//Test db
// const abc = User.build({email: "abc@gmail.com", password: "abc", mobile_number: "1234567890"});
// console.log(abc instanceof User);
// console.log(abc.email);
async function persistToDB() {
    try {
        await abc.save();
        console.log('Persisted successfully.');
    } catch (error) {
        console.error('Unable to persist:', error);
    }
}
// TODO: Hanndle promise rejection all kinds
// Like duplicate data and stuff
// persistToDB();
//Other method
// const xyz = User.create({email: "xyz@gmail.com", password: "xyz", mobile_number: "1234567890"});
// console.log(xyz instanceof User);
// console.log(xyz.email);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/application', applicationRoutes);
app.use('/admin',adminRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})