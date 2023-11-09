const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validateAppointmentData = require("../middlewares/validateAppointmentData");
const validationMiddleware = require("../middlewares/validationMiddleware");

const appointmentsController = require("../controllers/appointmentsController");

// Middleware for date validation
const isValidDate = (value) => {
	const date = new Date(value);
	return !isNaN(date.getTime());
};

// Get appointments for the current day for a doctor
router.get(
	"/doctor",
	authMiddleware,
	appointmentsController.getDoctorAppointments
);

// Get appointments for the current day for a patient
router.get(
	"/patient",
	authMiddleware,
	appointmentsController.getPatientAppointments
);

// Create a new appointment
router.post(
	"/",
	authMiddleware,
	validateAppointmentData,
	validationMiddleware,
	appointmentsController.createAppointment
);

// Update the status of an appointment
router.put(
	"/:appointmentId",
	authMiddleware,
	appointmentsController.updateAppointmentStatus
);

// Cancel an appointment
router.delete(
	"/:appointmentId",
	authMiddleware,
	appointmentsController.cancelAppointment
);

module.exports = router;
