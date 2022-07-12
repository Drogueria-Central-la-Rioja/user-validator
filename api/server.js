const express = require("express");
const config = require('../config/config');
const { sequelize } = require('../models/index');

const userRoutes = require("./Routes/user.routes");

const app = express();

// Public response
app.use(express.static('public'));

// Charge route modules
app.use('/users', userRoutes);

app.listen(config.PORT, config.HOST, () => {
    console.log(`Server running in: http://${config.HOST}:${config.PORT}`);

    // Conection database
    sequelize.authenticate().then(() => {
        console.log("Successful connection to database!");
    });
});