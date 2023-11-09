// sockets/appointmentsSocket.js

const Appointment = require("../models/appointments");

module.exports = (io) => {
	const appointmentsNamespace = io.of("/appointments");

	appointmentsNamespace.on("connection", (socket) => {
		// Subscribe to appointment updates for a specific user
		socket.on("subscribe", (userId) => {
			socket.join(userId);
		});

		// Unsubscribe from appointment updates for a specific user
		socket.on("unsubscribe", (userId) => {
			socket.leave(userId);
		});

		// Emit appointment updates when the status changes
		const emitAppointmentUpdate = async (appointmentId) => {
			try {
				const updatedAppointment = await Appointment.findById(
					appointmentId
				)
					.populate("user", "name")
					.populate("doctor", "name speciality");

				if (updatedAppointment) {
					const userId = updatedAppointment.user._id.toString();
					appointmentsNamespace
						.to(userId)
						.emit("appointmentUpdate", updatedAppointment);
				}
			} catch (err) {
				console.error(err);
			}
		};

		// Listen for status updates from other parts of your application
		socket.on("statusUpdate", (appointmentId) => {
			emitAppointmentUpdate(appointmentId);
		});
	});
};
