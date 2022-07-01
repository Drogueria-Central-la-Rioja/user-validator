const controller = require("./controller");

module.exports = function(userValidatorApp){
    userValidatorApp.route("/about").get(controller.about);
    userValidatorApp.route("/weather").get(controller.getWeather);
};