const express = require('express');
const { Sequelize } = require('sequelize');

const userRoutes = require('./routes/user');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/uk_coop_be'); //db_uri --Tushar

//DB Connection test
async function dbTest() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
dbTest();

const app = express();

// app.use('/user', userRoutes);
// app.use('/application', applicationRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})