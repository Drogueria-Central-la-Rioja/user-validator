const express = require("express");
const config = require('../config/config');
const { sequelize } = require('../models/index');

const userRoutes = require("./Routes/user.routes");
const publicRoutes = require("./Routes/public.routes");
const { executeCrons } = require("./Services/cron.service");
const { validateJWT } = require("./middlewares/validateJWT");

const app = express();

// Public response
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Load routes
app.use('/public', publicRoutes);
app.use('/users', validateJWT, userRoutes);

app.listen(config.PORT, config.HOST, () => {
    console.log(`Server running in: http://${config.HOST}:${config.PORT}`);

    // Conection database
    sequelize.authenticate().then(() => {
        console.log("Successful connection to database!");
    });

    executeCrons();
});