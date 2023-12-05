// clinicController.js
const Clinic = require("../models/clinic");

// Add a clinic
const addClinic = async (req, res) => {
	try {
		const { name, location, modifiers } = req.body;

		const clinic = new Clinic({
			name,
			location,
			modifiers,
		});

		await clinic.save();

		res.json({ message: "Clinic creation successful" });
	} catch (error) {
		console.error("Clinic creation failed:", error);
		res.status(500).json({ error: "Clinic creation failed" });
	}
};

// Get all clinics
const getAllClinics = async (req, res) => {
	try {
		const clinics = await Clinic.find();
		res.json(clinics);
	} catch (error) {
		console.error("Fetching clinics failed:", error);
		res.status(500).json({ error: "Fetching clinics failed" });
	}
};

// Get a clinic by ID
const getClinicById = async (req, res) => {
	try {
		const clinicId = req.params.id;
		const clinic = await Clinic.findById(clinicId);
		res.json(clinic);
	} catch (error) {
		console.error("Fetching clinic failed:", error);
		res.status(500).json({ error: "Fetching clinic failed" });
	}
};

// Update a clinic by ID
const updateClinicById = async (req, res) => {
	try {
		const clinicId = req.params.id;
		const { name, location, modifiers } = req.body;

		const updatedClinic = await Clinic.findByIdAndUpdate(
			clinicId,
			{ name, location, modifiers },
			{ new: true }
		);

		res.json({
			message: "Clinic updated successfully",
			clinic: updatedClinic,
		});
	} catch (error) {
		console.error("Clinic update failed:", error);
		res.status(500).json({ error: "Clinic update failed" });
	}
};

// Delete a clinic by ID
const deleteClinicById = async (req, res) => {
	try {
		const clinicId = req.params.id;
		const deletedClinic = await Clinic.findByIdAndDelete(clinicId);
		res.json({
			message: "Clinic deleted successfully",
			clinic: deletedClinic,
		});
	} catch (error) {
		console.error("Clinic deletion failed:", error);
		res.status(500).json({ error: "Clinic deletion failed" });
	}
};

// Add a modifier to the clinic
const addModifierToClinic = async (req, res) => {
	try {
		const clinicId = req.params.id;
		const { modifierId } = req.body;

		const clinic = await Clinic.findById(clinicId);

		if (!clinic) {
			return res.status(404).json({ error: "Clinic not found" });
		}

		clinic.modifiers.push(modifierId);
		await clinic.save();

		res.json({ message: "Modifier added to clinic successfully" });
	} catch (error) {
		console.error("Adding modifier to clinic failed:", error);
		res.status(500).json({ error: "Adding modifier to clinic failed" });
	}
};

// Remove a modifier from the clinic
const removeModifierFromClinic = async (req, res) => {
	try {
		const clinicId = req.params.id;
		const { modifierId } = req.body;

		const clinic = await Clinic.findById(clinicId);

		if (!clinic) {
			return res.status(404).json({ error: "Clinic not found" });
		}

		clinic.modifiers = clinic.modifiers.filter(
			(id) => id.toString() !== modifierId
		);
		await clinic.save();

		res.json({ message: "Modifier removed from clinic successfully" });
	} catch (error) {
		console.error("Removing modifier from clinic failed:", error);
		res.status(500).json({ error: "Removing modifier from clinic failed" });
	}
};

// Get the list of modifiers associated with a clinic
const getModifiersForClinic = async (req, res) => {
	try {
		const clinicId = req.params.id;
		const clinic = await Clinic.findById(clinicId).populate("modifiers");

		if (!clinic) {
			return res.status(404).json({ error: "Clinic not found" });
		}

		res.json(clinic.modifiers);
	} catch (error) {
		console.error("Fetching modifiers for clinic failed:", error);
		res.status(500).json({ error: "Fetching modifiers for clinic failed" });
	}
};

module.exports = {
	addClinic,
	getAllClinics,
	getClinicById,
	updateClinicById,
	deleteClinicById,
	addModifierToClinic,
	removeModifierFromClinic,
	getModifiersForClinic,
	// Add other clinic-related methods as needed
};
