const express = require("express");
const userRoutes = require("./Routes/user.routes");

const hostname = "0.0.0.0";
const port = 5000;
const app = express();

app.use(express.static('public'));

// Charge route modules
app.use('/users', userRoutes);


app.listen(port, () => {
    console.log("Running in localhost:5000...");
});