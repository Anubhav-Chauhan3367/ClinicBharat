//imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//import routes
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const commonRoutes = require("./routes/common");

//app setup
const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/", commonRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);

//error handling
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	res.send("<h1>Page not found</h1>");
});

//connect to mongodb
mongoose
	.connect("connection string")
	.then((result) => {
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});
