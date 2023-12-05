const Queue = require("../models/queue");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");

// Controller function to create a new queue
const createQueue = async (req, res) => {
	try {
		const { doctorId, name } = req.body;

		// Check if the doctor exists
		const doctor = await Doctor.findById(doctorId);
		if (!doctor) {
			return res.status(404).json({ error: "Doctor not found" });
		}

		// Create a new queue
		const newQueue = await Queue.createQueue(doctorId, name);

		return res.status(201).json(newQueue);
	} catch (error) {
		console.error("Error creating queue:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controller function to get all queues for a doctor
const getAllQueuesForDoctor = async (req, res) => {
	try {
		const { doctorId } = req.params;

		// Check if the doctor exists
		const doctor = await Doctor.findById(doctorId);
		if (!doctor) {
			return res.status(404).json({ error: "Doctor not found" });
		}

		// Retrieve all queues for the doctor
		const queues = await Queue.find({ doctor: doctorId });

		return res.status(200).json(queues);
	} catch (error) {
		console.error("Error fetching queues:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controller function to add an appointment to a queue
const addAppointmentToQueue = async (req, res) => {
	try {
		const { queueId, appointmentId } = req.body;

		// Check if the queue exists
		const queue = await Queue.findById(queueId);
		if (!queue) {
			return res.status(404).json({ error: "Queue not found" });
		}

		// Check if the appointment exists
		const appointment = await Appointment.findById(appointmentId);
		if (!appointment) {
			return res.status(404).json({ error: "Appointment not found" });
		}

		// Add the appointment to the queue
		await queue.addAppointment(appointmentId);

		return res
			.status(200)
			.json({ message: "Appointment added to the queue" });
	} catch (error) {
		console.error("Error adding appointment to queue:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controller function to remove an appointment from a queue
const removeAppointmentFromQueue = async (req, res) => {
	try {
		const { queueId, appointmentId } = req.body;

		// Check if the queue exists
		const queue = await Queue.findById(queueId);
		if (!queue) {
			return res.status(404).json({ error: "Queue not found" });
		}

		// Check if the appointment exists
		const appointment = await Appointment.findById(appointmentId);
		if (!appointment) {
			return res.status(404).json({ error: "Appointment not found" });
		}

		// Remove the appointment from the queue
		await queue.removeAppointment(appointmentId);

		return res
			.status(200)
			.json({ message: "Appointment removed from the queue" });
	} catch (error) {
		console.error("Error removing appointment from queue:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	createQueue,
	getAllQueuesForDoctor,
	addAppointmentToQueue,
	removeAppointmentFromQueue,
};
