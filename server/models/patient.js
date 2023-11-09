const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const OTP = require("./otp");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET; // Import your JWT secret

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
	phone: {
		type: String,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	address: {
		type: String,
	},
	age: {
		type: Number,
	},
	gender: {
		type: String,
	},
	medical_history: {
		type: String,
	},
	isEmailVerified: {
		type: Boolean,
		default: false,
	},
	isPhoneVerified: {
		type: Boolean,
		default: false,
	},
	emailVerificationToken: {
		type: String,
	},
	phoneVerificationToken: {
		type: String,
	},
	jwtToken: String, // Field to store the JWT token
});

// Pre-save hook to hash the password before saving to the database
patientSchema.pre("save", async function (next) {
	const patient = this;
	if (patient.isModified("password")) {
		patient.password = await bcrypt.hash(patient.password, 10);
	}
	next();
});

// A custom method to authenticate a patient and generate a JWT token
patientSchema.statics.authenticate = async function (email, password) {
	const patient = await this.findOne({ email });

	if (!patient) {
		throw new Error("Patient not found");
	}

	const isPasswordMatch = await bcrypt.compare(password, patient.password);

	if (!isPasswordMatch) {
		throw new Error("Incorrect password");
	}

	// Generate a JWT token
	const token = jwt.sign({ _id: patient._id }, jwtSecret);

	// Save the token to the patient's document
	patient.jwtToken = token;
	await patient.save();

	return token;
};

// Generate a SHA-512 hash of the email verification token
patientSchema.methods.generateEmailVerificationTokenHash = function () {
	const sha512 = crypto.createHash("sha512");
	sha512.update(this.emailVerificationToken);
	return sha512.digest("hex");
};

// Generate a SHA-512 hash of the phone verification token
patientSchema.methods.generatePhoneVerificationTokenHash = function () {
	const sha512 = crypto.createHash("sha512");
	sha512.update(this.phoneVerificationToken);
	return sha512.digest("hex");
};

// Create an email verification OTP
patientSchema.methods.createEmailVerificationOTP = async function () {
	if (this.isEmailVerified) {
		throw new Error("Email is already verified.");
	}

	// Generate a new OTP
	const otpDocument = await OTP.createOTP(this, "email-verification");

	// Store the email verification token in the user's document
	this.emailVerificationToken = otpDocument.otp;
	await this.save();

	return otpDocument;
};

// Create a phone verification OTP
patientSchema.methods.createPhoneVerificationOTP = async function () {
	if (this.isPhoneVerified) {
		throw new Error("Phone is already verified.");
	}

	// Generate a new OTP
	const otpDocument = await OTP.createOTP(this, "phone-verification");

	// Store the phone verification token in the user's document
	this.phoneVerificationToken = otpDocument.otp;
	await this.save();

	return otpDocument;
};

// Verify an email verification OTP
patientSchema.methods.verifyEmailVerificationOTP = async function (inputOTP) {
	if (this.isEmailVerified) {
		throw new Error("Email is already verified.");
	}

	if (!this.emailVerificationToken) {
		throw new Error("No email verification token found.");
	}

	// Find the associated OTP document and verify the OTP
	const otpDocument = await OTP.findOne({
		otp: this.emailVerificationToken,
		user: this._id,
		purpose: "email-verification",
	});

	if (!otpDocument) {
		throw new Error("Invalid or expired email verification OTP.");
	}

	// Mark the OTP as verified and save the user
	otpDocument.verified = true;
	await otpDocument.save();

	// Mark the email as verified
	this.isEmailVerified = true;
	await this.save();
};

// Verify a phone verification OTP
patientSchema.methods.verifyPhoneVerificationOTP = async function (inputOTP) {
	if (this.isPhoneVerified) {
		throw new Error("Phone is already verified.");
	}

	if (!this.phoneVerificationToken) {
		throw new Error("No phone verification token found.");
	}

	// Find the associated OTP document and verify the OTP
	const otpDocument = await OTP.findOne({
		otp: this.phoneVerificationToken,
		user: this._id,
		purpose: "phone-verification",
	});

	if (!otpDocument) {
		throw new Error("Invalid or expired phone verification OTP.");
	}

	// Mark the OTP as verified and save the user
	otpDocument.verified = true;
	await otpDocument.save();

	// Mark the phone as verified
	this.isPhoneVerified = true;
	await this.save();
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
