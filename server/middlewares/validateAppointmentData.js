const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

// Middleware for validating appointment data
const validateAppointmentData = [
	body("user").isMongoId().withMessage("Invalid user ID"),
	body("doctor").isMongoId().withMessage("Invalid doctor ID"),
	body("booking_time")
		.isISO8601()
		.toDate()
		.withMessage("Invalid booking time"),
	body("appointment_date")
		.isISO8601()
		.toDate()
		.withMessage("Invalid appointment date"),
	body("duration")
		.isInt({ min: 1 })
		.withMessage("Duration should be a positive integer"),
	body("status")
		.isIn(["scheduled", "late", "cancelled", "completed"])
		.withMessage("Invalid status"),
];

module.exports = {
	validateAppointmentData,
};
