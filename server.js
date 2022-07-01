const express = require("express");

const hostname = "0.0.0.0";
const port = 5000;

const userValidatorApp = express();

const routes = require("./api/routes");
routes(userValidatorApp);

userValidatorApp.listen(port, () => {
    console.log("Running...");
});