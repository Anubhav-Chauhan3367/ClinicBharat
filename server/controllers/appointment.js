const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor"); // Import the Doctor model
const io = require("../sockets/index").getIO();

// Get appointments for the current day for a doctor
const getDoctorAppointments = async (req, res) => {
	try {
		// Assuming doctor ID is stored in req.user.id after authentication
		const doctorId = req.user.id;
		const appointments = await Appointment.getAppointmentsForDoctor(
			doctorId
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
			patientId
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
			await Appointment.getAppointmentsForDoctor(doctorId, "waiting");
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
			await Appointment.getAppointmentsForPatient(patientId, "waiting");
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

		// Use the model method to create a new appointment
		const newAppointment = await Appointment.createAppointment({
			patient: patientId,
			doctor,
			booking_time,
			appointment_date,
			status,
			notes,
		});

		await newAppointment.populate("patient");
		await newAppointment.populate("doctor");

		// Emit socket event for real-time update
		io.of("/appointments").emit("newAppointment", {
			appointment: newAppointment,
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

		// Check and transfer appointments if needed
		await transferAppointmentsToMainQueue(updatedAppointment.doctor);

		res.json(updatedAppointment);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Update the queue ID of an appointment
const updateAppointmentQueue = async (req, res) => {
	try {
		const { appointmentId } = req.params;
		const { newQueueId } = req.body;

		// Additional validation or checks can be added here

		// Find the appointment by ID
		const appointment = await Appointment.findById(appointmentId);

		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		// Use the instance method to update the queue ID
		await appointment.updateQueue(newQueueId);

		// Fetch the updated appointment to send in the response
		const updatedAppointment = await Appointment.findById(appointmentId);

		// Emit socket event for real-time update with queue type
		io.of("/appointments").emit("appointmentUpdate", {
			updatedAppointment: updatedAppointment,
			queueType: updatedAppointment.queue,
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

		// Check and transfer appointments if needed
		await transferAppointmentsToMainQueue(cancelledAppointment.doctor);

		res.json(cancelledAppointment);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Transfer appointments from waiting queue to main queue if needed
const transferAppointmentsToMainQueue = async (doctorId) => {
	try {
		const doctorModel = await Doctor.findById(doctorId);
		const mainQueueLimit = doctorModel.mainQueueLimit;

		const mainQueueAppointmentsCount = await Appointment.count({
			doctor: doctorId,
			appointment_date: { $gte: new Date() },
			queue: "main",
			status: "scheduled",
		});

		if (mainQueueAppointmentsCount < mainQueueLimit) {
			// Get the waiting queue appointments
			const waitingQueueAppointments = await Appointment.find({
				doctor: doctorId,
				appointment_date: { $gte: new Date() },
				queue: "waiting",
				status: "scheduled",
			})
				.sort({ created_at: 1 })
				.limit(mainQueueLimit - mainQueueAppointmentsCount);

			// Update the queue type to "main" for the transferred appointments
			const updatePromises = waitingQueueAppointments.map(
				async (appointment) => {
					await Appointment.findByIdAndUpdate(appointment._id, {
						queue: "main",
					});
					// Emit socket event for real-time update
					io.of("/appointments").emit("appointmentUpdate", {
						updatedAppointment: appointment,
						queueType: "main",
					});
				}
			);

			await Promise.all(updatePromises);
		}
	} catch (err) {
		console.error("Error transferring appointments to main queue:", err);
	}
};

module.exports = {
	getDoctorAppointments,
	getPatientAppointments,
	getDoctorWaitingQueueAppointments,
	getPatientWaitingQueueAppointments,
	createAppointment,
	updateAppointmentStatus,
	updateAppointmentQueue,
	cancelAppointment,
};
