const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
	appointment_id: {
		type: Number,
		unique: true,
		required: true,
	},
	user: {
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
	duration: {
		type: Number, // Duration in minutes
		required: true,
	},
	status: {
		type: String,
		enum: ["scheduled", "late", "cancelled", "completed"],
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
});

// Static method to create a new appointment
appointmentSchema.statics.createAppointment = async function (data) {
	return this.create(data);
};

// Instance method to cancel an appointment
appointmentSchema.methods.cancelAppointment = function () {
	this.status = "cancelled";
	return this.save();
};

// Instance method to mark an appointment as 'late'
appointmentSchema.methods.markAsLate = function () {
	this.status = "late";
	return this.save();
};

// Static method to retrieve a doctor's upcoming appointments
appointmentSchema.statics.getUpcomingAppointmentsForDoctor = function (
	doctorId
) {
	return this.find({
		doctor: doctorId,
		status: "scheduled",
		appointment_date: { $gte: new Date() },
	})
		.populate("user")
		.populate("doctor");
};

// Static method to retrieve a patient's upcoming appointments
appointmentSchema.statics.getUpcomingAppointmentsForPatient = function (
	patientId
) {
	return this.find({
		user: patientId,
		status: "scheduled",
		appointment_date: { $gte: new Date() },
	})
		.populate("user")
		.populate("doctor");
};

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
