const Patient = require("../models/patient");
const { createTransporter, sendEmail } = require("../services/emailService");
const { sendSMS } = require("../services/smsService");
const jwt = require("jsonwebtoken");

// Function for patient registration
const registerPatient = async (req, res) => {
	try {
		const { username, email, phone, password, medical_history } = req.body;

		// Create a new patient instance
		const patient = new Patient({
			username,
			email,
			phone,
			password,
			medical_history,
		});

		// Save the patient to the database
		await patient.save();

		// Check if the user provided an email for verification
		// if (email) {
		// 	const emailOTP = await patient.createEmailVerificationOTP();

		// 	// Send an email with the OTP
		// 	const emailTransporter = createTransporter();
		// 	const emailSubject = "Email Verification OTP";
		// 	const emailText = `Your email verification OTP is: ${emailOTP.otp}`;
		// 	await sendEmail(emailTransporter, email, emailSubject, emailText);
		// }

		// // Check if the user provided a phone number for verification
		// if (phone) {
		// 	const phoneOTP = await patient.createPhoneVerificationOTP();

		// 	// Send an SMS with the OTP
		// 	const smsText = `Your phone verification OTP is: ${phoneOTP.otp}`;
		// 	await sendSMS(phone, smsText);
		// }

		res.json({ message: "Patient registration successful" });
	} catch (error) {
		res.status(500).json({ error: "Registration failed" });
	}
};

// Function to verify email using OTP
const verifyEmail = async (req, res) => {
	try {
		const { otp } = req.body;
		const patient = req.user; // Assuming you have middleware to set the authenticated patient in req.user

		// Verify email OTP
		await patient.verifyEmailVerificationOTP(otp);

		// Redirect to a page for completing the patient's profile or provide another response
		res.json({ message: "Email verification successful" });
	} catch (error) {
		res.status(500).json({ error: "Email verification failed" });
	}
};

// Function to verify phone using OTP
const verifyPhone = async (req, res) => {
	try {
		const { otp } = req.body;
		const patient = req.user; // Assuming you have middleware to set the authenticated patient in req.user

		// Verify phone OTP
		await patient.verifyPhoneVerificationOTP(otp);

		// Redirect to a page for completing the patient's profile or provide another response
		res.json({ message: "Phone verification successful" });
	} catch (error) {
		res.status(500).json({ error: "Phone verification failed" });
	}
};

// Function for patient login
const loginPatient = async (req, res) => {
	try {
		const { email, password } = req.body;

		const token = await Patient.authenticate(email, password);

		const user = await Patient.findOne({ email: email });

		res.status(200).json({
			message: "Patient login successful",
			user: user,
		});
	} catch (error) {
		res.status(401).json({ error: "Authentication failed" });
	}
};

// Function to handle patient logout with token expiry
const logoutPatient = async (req, res) => {
	try {
		// Get the current user (patient) from the request
		const patient = req.user;

		// Set the JWT token expiry time to the past (immediately revoke the token)
		patient.jwtToken = null; // Assuming you have a field for the JWT token in your Patient model
		// Create a new JWT token with an expiration time set to the past (immediately invalid)
		const token = jwt.sign({}, process.env.JWT_SECRET, {
			expiresIn: "1ms",
		});

		// Set the JWT token in the response header (to invalidate the client's token)
		res.header("Authorization", `Bearer ${token}`);

		// Clear the token from the client-side (client's browser)
		// res.clearCookie("access_token"); // Example for clearing a token stored in a cookie

		// Save the patient document with the revoked token (setting it to null)
		await patient.save();

		// Respond with a success message
		res.json({ message: "Patient logout successful" });
	} catch (error) {
		console.error("Patient logout failed:", error);
		res.status(500).json({ error: "Patient logout failed" });
	}
};

module.exports = {
	registerPatient,
	verifyEmail,
	verifyPhone,
	loginPatient,
	logoutPatient,
};
