// sockets/appointmentsSocket.js

const Appointment = require("../models/appointment");
console.log(require("./index"));
const io = require("./index").getIO();

module.exports = () => {
	const appointmentsNamespace = io.of("/appointments");

	appointmentsNamespace.on("connection", (socket) => {
		// Subscribe to appointment updates for a specific user
		console.log("connected");
		// Emit appointment updates when the status changes
		const emitAppointmentUpdate = async (appointmentId) => {
			try {
				const updatedAppointment = await Appointment.findById(
					appointmentId
				)
					.populate("patient", "username")
					.populate("doctor", "username speciality");

				if (updatedAppointment) {
					const userId = updatedAppointment.user._id.toString();
					appointmentsNamespace.emit(
						"appointmentUpdate",
						updatedAppointment
					);
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
