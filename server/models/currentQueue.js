const mongoose = require("mongoose");

const currentQueueSchema = new mongoose.Schema({
	appointment_id: {
		type: Number,
		unique: true,
		required: true,
	},
	user_id: {
		type: Number,
		required: true,
	},
	doctor_id: {
		type: Number,
		required: true,
	},
	booking_time: {
		type: Date,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
});

const CurrentQueue = mongoose.model("CurrentQueue", currentQueueSchema);

module.exports = CurrentQueue;
