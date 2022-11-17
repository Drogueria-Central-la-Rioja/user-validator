const express = require("express");
const config = require('../config/config');
const { sequelize } = require('../models/index');
const path = require('path');

const profileRoutes = require("./Routes/profile.routes");
const userRoutes = require("./Routes/user.routes");
const publicRoutes = require("./Routes/public.routes");
const provinceRoutes = require("./Routes/province.routes");
const districtRoutes = require("./Routes/district.routes");

const { executeCrons } = require("./Services/cron.service");

// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpect = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User-validator API',
            version: '1.0.0'
        },
        servers: [
            {
                url: `http://${config.HOST}:${config.PORT}`
            }
        ]
    },
    apis: [`${path.join(__dirname, 'Routes/*.js')}`],
};

const app = express();

// Public response
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Load routes
app.use('/public', publicRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/provinces', provinceRoutes);
app.use('/districts', districtRoutes);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpect)));

app.listen(config.PORT, config.HOST, () => {
    console.log(`Server running in: http://${config.HOST}:${config.PORT}`);

    // Conection database
    sequelize.authenticate().then(() => {
        console.log("Successful connection to database!");
    });

    executeCrons();
});