const express = require("express");
const router = express.Router();
const {
	createQueue,
	getAllQueuesForDoctor,
	addAppointmentToQueue,
	removeAppointmentFromQueue,
} = require("../controllers/queue");
const authMiddleware = require("../middlewares/authMiddleware");

// Route to create a new queue
router.post("/create", authMiddleware("doctor"), createQueue);

// Route to get all queues for a doctor
router.get(
	"/doctor/:doctorId",
	authMiddleware("doctor"),
	getAllQueuesForDoctor
);

// Route to add an appointment to a queue
router.post(
	"/add-appointment",
	authMiddleware("doctor"),
	addAppointmentToQueue
);

// Route to remove an appointment from a queue
router.post(
	"/remove-appointment",
	authMiddleware("doctor"),
	removeAppointmentFromQueue
);

module.exports = router;
