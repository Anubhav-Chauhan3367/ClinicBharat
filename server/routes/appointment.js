const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const authMiddleware = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/validationMiddleware");

const appointmentsController = require("../controllers/appointment");

// Get appointments for the current day for a doctor
router.get(
	"/doctor",
	authMiddleware("doctor"),
	appointmentsController.getDoctorAppointments
);

// Get appointments for the current day for a patient
router.get(
	"/patient",
	authMiddleware("Patient"),
	appointmentsController.getPatientAppointments
);

// Create a new appointment
router.post(
	"/",
	authMiddleware("Patient"),
	[
		body("patient").isMongoId().withMessage("Invalid patient ID"),
		body("doctor").isMongoId().withMessage("Invalid doctor ID"),
		body("booking_time")
			.isISO8601()
			.toDate()
			.withMessage("Invalid booking time"),
		body("appointment_date")
			.isISO8601()
			.toDate()
			.withMessage("Invalid appointment date"),
		body("status")
			.isIn(["scheduled", "late", "completed"])
			.withMessage("Invalid status"),
		body("notes")
			.optional()
			.isString()
			.withMessage("Notes should be a string"),
	],
	validate,
	appointmentsController.createAppointment
);

// Update the status of an appointment
router.put(
	"/:appointmentId",
	authMiddleware("Patient"),
	appointmentsController.updateAppointmentStatus
);

// Update the queue of an appointment
router.put(
	"/update-queue/:appointmentId",
	authMiddleware("Patient"),
	[body("newQueueId").isMongoId().withMessage("Invalid new queue ID")],
	validate,
	appointmentsController.updateAppointmentQueue
);

// Cancel an appointment
router.delete(
	"/:appointmentId",
	authMiddleware("doctor"),
	appointmentsController.cancelAppointment
);

// New routes for waiting queue appointments
// Get waiting queue appointments for the current day for a doctor
router.get(
	"/waiting-doctor",
	authMiddleware("doctor"),
	appointmentsController.getDoctorWaitingQueueAppointments
);

// Get waiting queue appointments for the current day for a patient
router.get(
	"/waiting-patient",
	authMiddleware("Patient"),
	appointmentsController.getPatientWaitingQueueAppointments
);

module.exports = router;
