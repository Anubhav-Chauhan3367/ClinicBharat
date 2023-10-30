const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const doctorSchema = new mongoose.Schema({
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
	medical_license: {
		type: String,
	},
	specialty: {
		type: String,
		required: true,
	},
});

// Pre-save hook to hash the password before saving to the database
doctorSchema.pre("save", async function (next) {
	const doctor = this;
	if (doctor.isModified("password")) {
		doctor.password = await bcrypt.hash(doctor.password, 10);
	}
	next();
});

// Static method to authenticate a doctor
doctorSchema.statics.authenticate = async function (email, password) {
	const doctor = await this.findOne({ email });
	if (!doctor) {
		throw new Error("Doctor not found");
	}
	const isPasswordMatch = await bcrypt.compare(password, doctor.password);
	if (!isPasswordMatch) {
		throw new Error("Incorrect password");
	}
	return doctor;
};

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
