const Patient = require("../models/patient");

const registerPatient = async (req, res) => {
	try {
		const {
			username,
			email,
			password,
			medical_history,
			insurance_information,
		} = req.body;
		const patient = new Patient({
			username,
			email,
			password,
			medical_history,
			insurance_information,
		});
		await patient.save();
		res.status(201).json({ message: "Patient registered successfully" });
	} catch (error) {
		res.status(500).json({ error: "Registration failed" });
	}
};

const loginPatient = async (req, res) => {
	try {
		const { email, password } = req.body;
		const patient = await Patient.authenticate(email, password);
		// In a real application, you might generate and send a JWT token for authentication.
		res.status(200).json({
			message: "Patient logged in successfully",
			patient,
		});
	} catch (error) {
		res.status(401).json({ error: "Authentication failed" });
	}
};

const getPatients = async (req, res) => {
	try {
		const patients = await Patient.find();
		res.status(200).json(patients);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve patients" });
	}
};

const getPatientById = async (req, res) => {
	try {
		const { patientId } = req.params;
		const patient = await Patient.findById(patientId);
		if (!patient) {
			res.status(404).json({ error: "Patient not found" });
		} else {
			res.status(200).json(patient);
		}
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve patient" });
	}
};

module.exports = {
	registerPatient,
	loginPatient,
	getPatients,
	getPatientById,
};
