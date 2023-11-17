const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor"); // Import the Doctor model
const io = require("../sockets/index").getIO();

// Get appointments for the current day for a doctor
const getDoctorAppointments = async (req, res) => {
	try {
		// Assuming doctor ID is stored in req.user.id after authentication
		const doctorId = req.user.id;
		const appointments = await Appointment.getAppointmentsForDoctor(
			doctorId,
			"main" // Specify the queue type (main or waiting)
		);
		res.json(appointments);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Get appointments for the current day for a patient
const getPatientAppointments = async (req, res) => {
	try {
		// Assuming patient ID is stored in req.user.id after authentication
		const patientId = req.user.id;
		const appointments = await Appointment.getAppointmentsForPatient(
			patientId,
			"main" // Specify the queue type (main or waiting)
		);
		res.json(appointments);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Get appointments for the waiting queue for a doctor
const getDoctorWaitingQueueAppointments = async (req, res) => {
	try {
		// Assuming doctor ID is stored in req.user.id after authentication
		const doctorId = req.user.id;
		const waitingQueueAppointments =
			await Appointment.getAppointmentsForDoctor(
				doctorId,
				"waiting" // Specify the queue type (main or waiting)
			);
		res.json(waitingQueueAppointments);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Get appointments for the waiting queue for a patient
const getPatientWaitingQueueAppointments = async (req, res) => {
	try {
		// Assuming patient ID is stored in req.user.id after authentication
		const patientId = req.user.id;
		const waitingQueueAppointments =
			await Appointment.getAppointmentsForPatient(
				patientId,
				"waiting" // Specify the queue type (main or waiting)
			);
		res.json(waitingQueueAppointments);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Create a new appointment
const createAppointment = async (req, res) => {
	try {
		const {
			patient,
			doctor,
			booking_time,
			appointment_date,
			status,
			notes,
		} = req.body;

		// Assuming patient ID is stored in req.user.id after authentication
		const patientId = req.user.id;

		// Get the doctor's preference for the number of patients to see
		const doctorModel = await Doctor.findById(doctor);
		const mainQueueLimit = doctorModel.mainQueueLimit;

		let queueType = "main";

		// Check if the main queue limit has been reached
		const mainQueueAppointmentsCount = await Appointment.count({
			doctor,
			appointment_date: { $gte: new Date() },
			queue: "main",
			status: "scheduled", // Consider only scheduled appointments
		});

		if (mainQueueAppointmentsCount >= mainQueueLimit) {
			queueType = "waiting";
		}

		// Use the model method to create a new appointment
		const newAppointment = await Appointment.createAppointment({
			patient: patientId,
			doctor,
			booking_time,
			appointment_date,
			status,
			notes,
			queue: queueType,
		});

		// Populate the patient field to get the complete patient reference
		await newAppointment.populate("patient").execPopulate();

		// Emit socket event for real-time update
		io.of("/appointments").emit("newAppointment", {
			appointment: newAppointment,
			queueType: queueType,
		});

		res.status(201).json(newAppointment);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Update the status of an appointment
const updateAppointmentStatus = async (req, res) => {
	try {
		const { appointmentId } = req.params;
		const { status } = req.body;

		// Additional validation or checks can be added here

		// Find the appointment by ID
		const appointment = await Appointment.findById(appointmentId);

		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		// Update the status using the instance method
		await appointment.updateStatus(status);

		// Fetch the updated appointment to send in the response
		const updatedAppointment = await Appointment.findById(appointmentId);

		// Emit socket event for real-time update with queue type
		io.of("/appointments").emit("appointmentUpdate", {
			updatedAppointment: updatedAppointment,
			queueType: appointment.queue,
		});

		res.json(updatedAppointment);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
	try {
		const { appointmentId } = req.params;

		const appointment = await Appointment.findById(appointmentId);

		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		// Call the instance method on the found appointment
		const cancelledAppointment = await appointment.cancelAppointment();

		// Emit socket event for real-time update with queue type
		io.of("/appointments").emit("appointmentCancelled", {
			cancelledAppointmentId: appointmentId,
			queueType: appointment.queue,
		});

		res.json(cancelledAppointment);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = {
	getDoctorAppointments,
	getPatientAppointments,
	getDoctorWaitingQueueAppointments,
	getPatientWaitingQueueAppointments,
	createAppointment,
	updateAppointmentStatus,
	cancelAppointment,
};
