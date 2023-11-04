const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient"); // Import the Patient model
const dotenv = require("dotenv");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

// Middleware to verify JWT tokens for both doctor and patient
const authenticationMiddleware = (userType) => (req, res, next) => {
	const token = req.header("Authorization");

	if (!token) {
		return res
			.status(401)
			.json({ message: "Access denied. No token provided." });
	}

	const model = userType === "doctor" ? Doctor : Patient;

	// const isPresent = Doctor.findOne({ jwtToken: token }).then((doc) => {
	// 	console.log(doc.username);
	// });
	// console.log(isPresent);
	const decoded = jwt.verify(token, jwtSecret);

	// Attach the authenticated user to the request
	console.log(decoded);
	model
		.findOne({ _id: decoded._id })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ message: "No user found!" });
			}
			req.user = user;
			next();
		})
		.catch((ex) => {
			console.log(ex);
			res.status(400).json({ message: "Invalid token" });
		});
};

module.exports = {
	authenticationMiddleware,
};
