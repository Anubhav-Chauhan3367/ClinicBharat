const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const clinicController = require("../controllers/clinic");
const authMiddleware = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/validationMiddleware");

// Route to add a clinic
router.post(
	"/add",
	[
		body("name")
			.isLength({ min: 3 })
			.withMessage("Clinic name must be at least 3 characters"),
		body("location")
			.isLength({ min: 3 })
			.withMessage("Location must be at least 3 characters"),
		// You can add more validation for other fields
	],
	validate,
	authMiddleware("admin"), // Assuming you have an admin role for clinic creation
	clinicController.addClinic
);

// Route to get all clinics
router.get("/all", clinicController.getAllClinics);

// Route to get a clinic by ID
router.get(
	"/:id",
	[param("id").isMongoId().withMessage("Invalid clinic ID")],
	validate,
	clinicController.getClinicById
);

// Route to update a clinic by ID
router.put(
	"/update/:id",
	[
		param("id").isMongoId().withMessage("Invalid clinic ID"),
		body("name")
			.isLength({ min: 3 })
			.withMessage("Clinic name must be at least 3 characters"),
		body("location")
			.isLength({ min: 3 })
			.withMessage("Location must be at least 3 characters"),
		// You can add more validation for other fields
	],
	validate,
	authMiddleware("admin"), // Assuming you have an admin role for clinic update
	clinicController.updateClinicById
);

// Route to delete a clinic by ID
router.delete(
	"/delete/:id",
	[param("id").isMongoId().withMessage("Invalid clinic ID")],
	validate,
	authMiddleware("admin"), // Assuming you have an admin role for clinic deletion
	clinicController.deleteClinicById
);

// Route to add a modifier to a clinic
router.post(
	"/add-modifier/:id",
	[
		param("id").isMongoId().withMessage("Invalid clinic ID"),
		body("modifierId").isMongoId().withMessage("Invalid modifier ID"),
	],
	validate,
	authMiddleware("admin"), // Assuming you have an admin role for adding modifiers
	clinicController.addModifierToClinic
);

// Route to remove a modifier from a clinic
router.post(
	"/remove-modifier/:id",
	[
		param("id").isMongoId().withMessage("Invalid clinic ID"),
		body("modifierId").isMongoId().withMessage("Invalid modifier ID"),
	],
	validate,
	authMiddleware("admin"), // Assuming you have an admin role for removing modifiers
	clinicController.removeModifierFromClinic
);

// Route to get modifiers for a clinic
router.get(
	"/modifiers/:id",
	[param("id").isMongoId().withMessage("Invalid clinic ID")],
	validate,
	authMiddleware("admin"), // Assuming you have an admin role for viewing modifiers
	clinicController.getModifiersForClinic
);

// Add other clinic-related routes as needed

module.exports = router;
