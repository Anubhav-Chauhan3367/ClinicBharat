// clinic.js
const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
	timings: {
		start: String,
		end: String,
	},
	status: String,
});

const clinicSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	defaultAvailability: {
		monday: availabilitySchema,
		tuesday: availabilitySchema,
		wednesday: availabilitySchema,
		thursday: availabilitySchema,
		friday: availabilitySchema,
		saturday: availabilitySchema,
		sunday: availabilitySchema,
	},
	temporaryChanges: {
		monday: availabilitySchema,
		tuesday: availabilitySchema,
		wednesday: availabilitySchema,
		thursday: availabilitySchema,
		friday: availabilitySchema,
		saturday: availabilitySchema,
		sunday: availabilitySchema,
	},
	status: {
		type: String,
		default: "not arrived",
	},
	// List of modifiers associated with the clinic
	modifiers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Modifier",
		},
	],
	// Other fields as needed
});

const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = Clinic;
