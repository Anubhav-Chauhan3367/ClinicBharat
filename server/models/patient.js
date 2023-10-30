const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const patientSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	medical_history: {
		type: String,
	},
	insurance_information: {
		type: String,
	},
});

// Pre-save hook to hash the password before saving to the database
patientSchema.pre("save", async function (next) {
	const patient = this;
	if (patient.isModified("password")) {
		patient.password = await bcrypt.hash(patient.password, 10);
	}
	next();
});

// Static method to authenticate a patient
patientSchema.statics.authenticate = async function (email, password) {
	const patient = await this.findOne({ email });
	if (!patient) {
		throw new Error("Patient not found");
	}
	const isPasswordMatch = await bcrypt.compare(password, patient.password);
	if (!isPasswordMatch) {
		throw new Error("Incorrect password");
	}
	return patient;
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
