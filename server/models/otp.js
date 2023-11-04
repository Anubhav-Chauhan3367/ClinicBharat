const mongoose = require("mongoose");
const crypto = require("crypto");

const otpSchema = new mongoose.Schema({
	otp: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Reference to the user (Doctor or Patient)
	},
	purpose: {
		type: String, // Purpose of the OTP (e.g., "email-verification", "phone-verification")
		required: true,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
});

// Generate a random OTP of a given length
otpSchema.statics.generateOTP = (length = 6) => {
	const digits = "0123456789";
	let otp = "";
	for (let i = 0; i < length; i++) {
		otp += digits[Math.floor(Math.random() * 10)];
	}
	return otp;
};

// Generate a SHA-512 hash of the OTP
otpSchema.methods.generateOTPHash = function () {
	const sha512 = crypto.createHash("sha512");
	sha512.update(this.otp);
	return sha512.digest("hex");
};

// Create a new OTP document
otpSchema.statics.createOTP = async function (
	user,
	purpose,
	expirationMinutes = 5
) {
	const otp = this.generateOTP();
	const expiresAt = new Date();
	expiresAt.setMinutes(expiresAt.getMinutes() + expirationMinutes);
	const otpDocument = new this({
		otp,
		user,
		purpose,
		expiresAt,
	});
	await otpDocument.save();
	return otpDocument;
};

// Verify an OTP
otpSchema.methods.verifyOTP = function (inputOTP) {
	const inputOTPHash = this.generateOTPHash();
	return inputOTPHash === this.otp;
};

// Expire an OTP
otpSchema.statics.expireOTP = async function (otpId) {
	await this.findByIdAndUpdate(otpId, { $set: { expiresAt: new Date() } });
};

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
