const Appointment = require("../models/appointments");

// Get appointments for the current day for a doctor
const getDoctorAppointments = async (req, res) => {
	try {
		// Assuming doctor ID is stored in req.user.id after authentication
		const doctorId = req.user.id;

		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

		const appointments = await Appointment.find({
			doctor: doctorId,
			appointment_date: currentDate,
		})
			.populate("user", "name") // Populate only the user's name for privacy
			.populate("doctor", "name speciality"); // Populate only the doctor's name and speciality

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

		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

		const appointments = await Appointment.find({
			user: patientId,
			appointment_date: currentDate,
		})
			.populate("doctor", "name speciality") // Populate only the doctor's name and speciality
			.sort({ booking_time: "asc" }); // Sort appointments by booking time in ascending order

		res.json(appointments);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Create a new appointment
const createAppointment = async (req, res) => {
	try {
		const {
			user,
			doctor,
			booking_time,
			appointment_date,
			duration,
			status,
		} = req.body;

		// Assuming patient ID is stored in req.user.id after authentication
		const patientId = req.user.id;

		// Additional validation or checks can be added here

		const newAppointment = await Appointment.create({
			user: patientId,
			doctor,
			booking_time,
			appointment_date,
			duration,
			status,
		});

		// Emit socket event for real-time update
		io.of("/appointments").emit("newAppointment", newAppointment);

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

		const updatedAppointment = await Appointment.findByIdAndUpdate(
			appointmentId,
			{ status },
			{ new: true }
		);

		if (!updatedAppointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		// Emit socket event for real-time update
		io.of("/appointments")
			.to(updatedAppointment.user.toString())
			.emit("appointmentUpdate", updatedAppointment);

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

		// Additional validation or checks can be added here

		const cancelledAppointment = await Appointment.findByIdAndDelete(
			appointmentId
		);

		if (!cancelledAppointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		// Emit socket event for real-time update
		io.of("/appointments").emit("appointmentCancelled", appointmentId);

		res.json(cancelledAppointment);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

module.exports = {
	getDoctorAppointments,
	getPatientAppointments,
	createAppointment,
	updateAppointmentStatus,
	cancelAppointment,
};
