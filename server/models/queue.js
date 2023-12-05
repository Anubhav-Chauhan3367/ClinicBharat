const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
		required: true,
	},
	appointments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Appointment",
		},
	],
	created_at: {
		type: Date,
		default: Date.now,
	},
	// Add other properties as needed
});

// Static method to create a new queue
queueSchema.statics.createQueue = async function (doctorId, name) {
	const newQueue = {
		doctor: doctorId,
		name,
		appointments: [],
	};
	return this.create(newQueue);
};

// Instance method to add an appointment to the queue
queueSchema.methods.addAppointment = async function (appointmentId) {
	this.appointments.push(appointmentId);
	await this.save();
};

// Instance method to remove an appointment from the queue
queueSchema.methods.removeAppointment = async function (appointmentId) {
	this.appointments = this.appointments.filter(
		(appId) => appId.toString() !== appointmentId.toString()
	);
	await this.save();
};

const Queue = mongoose.model("Queue", queueSchema);

module.exports = Queue;
