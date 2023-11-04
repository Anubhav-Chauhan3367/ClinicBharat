const nodemailer = require("nodemailer");

// Function to create a Nodemailer transporter
function createTransporter() {
	const transporter = nodemailer.createTransport({
		service: "Gmail", // Your email service provider
		auth: {
			user: "your-email@gmail.com",
			pass: "your-email-password",
		},
	});

	return transporter;
}

// Function to send an email
function sendEmail(transporter, recipient, subject, text) {
	const mailOptions = {
		from: "your-email@gmail.com",
		to: recipient,
		subject: subject,
		text: text,
	};

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error("Email sending failed: " + error);
				reject(error);
			} else {
				console.log("Email sent: " + info.response);
				resolve(info);
			}
		});
	});
}

module.exports = {
	createTransporter,
	sendEmail,
};
