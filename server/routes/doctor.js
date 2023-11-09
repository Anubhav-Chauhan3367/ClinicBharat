const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const doctorController = require("../controllers/doctor");
const dashboardController = require("../controllers/dashboard");
const authMiddleware = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/validationMiddleware");

// Route for the doctor's dashboard, responding with JSON data
router.get(
	"/dashboard",
	authMiddleware.authenticationMiddleware("doctor"),
	async (req, res) => {
		try {
			const doctor = req.user; // Assuming you have middleware to set the authenticated doctor in req.user

			// Replace this with logic to retrieve actual doctor dashboard data
			const dashboardData = dashboardController.getListOfPatients(
				req,
				res
			);

			res.json({ dashboardData });
		} catch (error) {
			res.status(500).json({
				error: "Error retrieving doctor dashboard data",
			});
		}
	}
);

// Route for doctor registration with validation middleware
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
	doctorController.registerDoctor // Call the registerDoctor controller function
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
	doctorController.loginDoctor // Call the loginDoctor controller function
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
			await doctorController.verifyEmail(req, res);
		} catch (error) {
			console.log(error);
			res.status(401).json({ error: "Doctor authentication failed" });
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
			await doctorController.verifyPhone(req, res);
		} catch (error) {
			console.log(error);
			res.status(401).json({ error: "Doctor authentication failed" });
		}
	}
);

// Route for doctor logout (optional)
router.post(
	"/logout",
	authMiddleware.authenticationMiddleware("doctor"),
	doctorController.logoutDoctor
);

module.exports = router;
