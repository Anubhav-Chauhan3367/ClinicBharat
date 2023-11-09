const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const patientController = require("../controllers/patient");
const dashboardController = require("../controllers/dashboard");
const authMiddleware = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/validationMiddleware");

// Route for the doctor's dashboard, responding with JSON data
router.get(
	"/dashboard",
	authMiddleware.authenticationMiddleware("patient"),
	async (req, res) => {
		try {
			const patient = req.user; // Assuming you have middleware to set the authenticated patient in req.user

			// Replace this with logic to retrieve actual doctor dashboard data
			const dashboardData = dashboardController.getListOfDoctors();
			res.json({ dashboardData });
		} catch (error) {
			res.status(500).json({
				error: "Error retrieving doctor dashboard data",
			});
		}
	}
);

// Route for patient registration with validation middleware
router.post(
	"/register",
	[
		body("username")
			.isLength({ min: 3 })
			.withMessage("Username must be at least 3 characters"),
		body("email")
			.isEmail()
			.withMessage("Invalid email address")
			.normalizeEmail(),
		body("password")
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters"),
		body("phone").isMobilePhone("any").withMessage("Invalid phone number"),
	],
	validate, // Use the validate middleware to check for validation errors
	patientController.registerPatient // Call the registerPatient controller function
);

// Route for doctor login
router.post(
	"/login",
	[
		body("email")
			.isEmail()
			.withMessage("Invalid email address")
			.normalizeEmail(),
		body("password")
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters"),
	],
	validate, // Use the validate middleware to check for validation errors
	patientController.loginPatient // Call the loginPatient controller function
);
router.post(
	"/verify-email",
	[
		body("otp")
			.isNumeric()
			.isLength({ min: 6, max: 6 })
			.withMessage("Invalid OTP"),
	],
	validate, // Use the validate middleware to check for validation errors
	async (req, res) => {
		try {
			// Implement login logic for doctors using the controller
			await patientController.verifyEmail(req, res);
		} catch (error) {
			console.log(error);
			res.status(401).json({ error: "Patient authentication failed" });
		}
	}
);

router.post(
	"/verify-phone",
	[
		body("otp")
			.isNumeric()
			.isLength({ min: 6, max: 6 })
			.withMessage("Invalid OTP"),
	],
	validate, // Use the validate middleware to check for validation errors
	async (req, res) => {
		try {
			// Implement login logic for doctors using the controller
			await patientController.verifyPhone(req, res);
		} catch (error) {
			console.log(error);
			res.status(401).json({ error: "Patient authentication failed" });
		}
	}
);

// Route for patient logout (optional)
router.post(
	"/logout",
	authMiddleware.authenticationMiddleware("patient"),
	patientController.logoutPatient
);

module.exports = router;
