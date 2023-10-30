const Doctor = require("../models/doctor");

const registerDoctor = async (req, res) => {
	try {
		const { username, email, password, medical_license, specialty } =
			req.body;
		const doctor = new Doctor({
			username,
			email,
			password,
			medical_license,
			specialty,
		});
		await doctor.save();
		res.status(201).json({ message: "Doctor registered successfully" });
	} catch (error) {
		res.status(500).json({ error: "Registration failed" });
	}
};

const loginDoctor = async (req, res) => {
	try {
		const { email, password } = req.body;
		const doctor = await Doctor.authenticate(email, password);
		res.status(200).json({
			message: "Doctor logged in successfully",
			doctor,
		});
	} catch (error) {
		res.status(401).json({ error: "Authentication failed" });
	}
};

const getDoctors = async (req, res) => {
	try {
		const doctors = await Doctor.find();
		res.status(200).json(doctors);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve doctors" });
	}
};

const getDoctorById = async (req, res) => {
	try {
		const { doctorId } = req.params;
		const doctor = await Doctor.findById(doctorId);
		if (!doctor) {
			res.status(404).json({ error: "Doctor not found" });
		} else {
			res.status(200).json(doctor);
		}
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve doctor" });
	}
};

module.exports = {
	registerDoctor,
	loginDoctor,
	getDoctors,
	getDoctorById,
};
