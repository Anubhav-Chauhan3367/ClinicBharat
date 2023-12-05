// modifier.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET; // Import your JWT secret

const modifierSchema = new mongoose.Schema({
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
	// Add other fields as needed
});

// Pre-save hook to hash the password before saving to the database
modifierSchema.pre("save", async function (next) {
	const modifier = this;
	if (modifier.isModified("password")) {
		modifier.password = await bcrypt.hash(modifier.password, 10);
	}
	next();
});

// A custom method to authenticate a modifier and generate a JWT token
modifierSchema.statics.authenticate = async function (email, password) {
	const modifier = await this.findOne({ email });

	if (!modifier) {
		throw new Error("modifier not found");
	}

	const isPasswordMatch = await bcrypt.compare(password, modifier.password);

	if (!isPasswordMatch) {
		throw new Error("Incorrect password");
	}

	// Generate a JWT token
	const token = jwt.sign({ _id: modifier._id }, jwtSecret);

	// Save the token to the modifier's document
	modifier.jwtToken = token;
	await modifier.save();

	return token;
};

const Modifier = mongoose.model("Modifier", modifierSchema);

module.exports = Modifier;
