//imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//import routes
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const commonRoutes = require("./routes/common");

//app setup
dotenv.config();
const app = express();

// Access the environment variable
const mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING;

//middlewares
app.use(cors());
app.use(bodyParser.json());

//routes
app.use("/", commonRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);

//error handling
app.use((err, req, res, next) => {
	if (err) {
		// Handle the error and send a JSON response
		console.error(err);
		const status = err.status || 500;
		const message = err.message || "Internal Server Error";
		res.status(status).json({ error: message });
	} else {
		next();
	}
});
//connect to mongodb
mongoose
	.connect(mongodbConnectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		app.listen(3001);
	})
	.catch((err) => {
		console.log(err);
	});
