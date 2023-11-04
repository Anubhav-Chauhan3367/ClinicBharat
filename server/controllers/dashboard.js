// dashboard.js (Dashboard Controller)

const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

// Function to get a list of doctors for the dashboard
const getListOfDoctors = async (req, res) => {
	try {
		const doctors = await Doctor.find();
		res.status(200).json(doctors);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve doctors" });
	}
};

// Function to get a list of patients for the dashboard
const getListOfPatients = async (req, res) => {
	try {
		const patients = await Patient.find();
		res.status(200).json(patients);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve patients" });
	}
};

module.exports = {
	getListOfDoctors,
	getListOfPatients,
};
