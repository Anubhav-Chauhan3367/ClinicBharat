const Doctor = require("../models/doctor");
const { createTransporter, sendEmail } = require("../services/emailService");
const { sendSMS } = require("../services/smsService");

// Function for doctor registration
const registerDoctor = async (req, res) => {
	try {
		console.log("inside registerDoctor");
		console.log(req.body);
		const { username, email, phone, password, medical_license, specialty } =
			req.body;

		const doctor = new Doctor({
			username,
			email,
			phone,
			password,
			medical_license,
			specialty,
		});

		await doctor.save();

		// Check if the user provided an email for verification
		// if (email) {
		// 	const emailOTP = await doctor.createEmailVerificationOTP();

		// 	// Send an email with the OTP
		// 	const emailTransporter = createTransporter();
		// 	const emailSubject = "Email Verification OTP";
		// 	const emailText = `Your email verification OTP is: ${emailOTP.otp}`;
		// 	await sendEmail(emailTransporter, email, emailSubject, emailText);
		// }

		// // Check if the user provided a phone number for verification
		// if (phone) {
		// 	const phoneOTP = await doctor.createPhoneVerificationOTP();

		// 	// Send an SMS with the OTP
		// 	const smsText = `Your phone verification OTP is: ${phoneOTP.otp}`;
		// 	await sendSMS(phone, smsText);
		// }

		res.json({ message: "Doctor registration successful" });
	} catch (error) {
		console.error("Registration failed:", error);
		res.status(500).json({ error: "Registration failed" });
	}
};

// Function to verify email using OTP
const verifyEmail = async (req, res) => {
	try {
		const { otp } = req.body;
		const doctor = req.user; // Assuming you have middleware to set the authenticated doctor in req.user

		await doctor.verifyEmailVerificationOTP(otp);

		res.json({ message: "Email verification successful" });
	} catch (error) {
		console.error("Email verification failed:", error);
		res.status(500).json({ error: "Email verification failed" });
	}
};

// Function to verify phone using OTP
const verifyPhone = async (req, res) => {
	try {
		const { otp } = req.body;
		const doctor = req.user; // Assuming you have middleware to set the authenticated doctor in req.user

		await doctor.verifyPhoneVerificationOTP(otp);

		res.json({ message: "Phone verification successful" });
	} catch (error) {
		console.error("Phone verification failed:", error);
		res.status(500).json({ error: "Phone verification failed" });
	}
};

// Function for doctor login and generate JWT
const loginDoctor = async (req, res) => {
	try {
		const { email, password } = req.body;

		const token = await Doctor.authenticate(email, password);

		res.status(200).json({
			message: "Doctor login successful",
			token: token,
		});
	} catch (error) {
		res.status(401).json({ error: "Authentication failed" });
	}
};

module.exports = {
	registerDoctor,
	verifyEmail,
	verifyPhone,
	loginDoctor,
};
