const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

function sendSMS(to, message) {
	return client.messages.create({
		body: message,
		from: "", // Your Twilio phone number
		to: to, // Recipient's phone number
	});
}

module.exports = {
	sendSMS,
};
