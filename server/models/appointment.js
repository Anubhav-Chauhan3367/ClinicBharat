const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
		required: true,
	},
	booking_time: {
		type: Date,
		required: true,
	},
	appointment_date: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		enum: ["scheduled", "late", "completed"],
		default: "scheduled",
	},
	notes: String,
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
	// New field to indicate the queue type (main or waiting)
	queue: {
		type: String,
		enum: ["main", "waiting"],
		default: "main",
	},
});

// Static method to create a new appointment
appointmentSchema.statics.createAppointment = async function (data) {
	return this.create(data);
};

// Instance method to cancel an appointment
appointmentSchema.methods.cancelAppointment = async function () {
	await this.remove();
	return this;
};

// Instance method to update the status of an appointment
appointmentSchema.methods.updateStatus = function (newStatus) {
	this.status = newStatus;
	return this.save();
};

// Static method to retrieve a doctor's appointments for the current date and specific queue type
appointmentSchema.statics.getAppointmentsForDoctor = function (
	doctorId,
	queueType
) {
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);

	const query = {
		doctor: doctorId,
		appointment_date: { $gte: currentDate },
	};

	if (queueType) {
		query.queue = queueType;
	}

	const res = this.find(query).populate("patient").populate("doctor");

	return res;
};

// Static method to retrieve a patient's appointments for the current date and specific queue type
appointmentSchema.statics.getAppointmentsForPatient = function (
	patientId,
	queueType
) {
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);

	const query = {
		patient: patientId,
		appointment_date: { $gte: currentDate },
	};

	if (queueType) {
		query.queue = queueType;
	}

	return this.find(query).populate("patient").populate("doctor");
};

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
