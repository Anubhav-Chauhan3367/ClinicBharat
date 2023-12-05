// modifierController.js
const Modifier = require("../models/modifier");

const registerModifier = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const modifier = new Modifier({
            username,
            email,
            password,
            // Add other fields as needed
        });

        await modifier.save();

        res.json({ message: "Modifier creation successful" });
    } catch (error) {
        console.error("Modifier creation failed:", error);
        res.status(500).json({ error: "Modifier creation failed" });
    }
};



const getModifierById = async (req, res) => {
    try {
        const modifierId = req.params.id;
        const modifier = await Modifier.findById(modifierId);
        res.json(modifier);
    } catch (error) {
        console.error("Fetching modifier failed:", error);
        res.status(500).json({ error: "Fetching modifier failed" });
    }
};

const updateModifierById = async (req, res) => {
    try {
        const modifierId = req.params.id;
        const { username, email, password } = req.body;

        const updatedModifier = await Modifier.findByIdAndUpdate(
            modifierId,
            { username, email, password },
            { new: true }
        );

        res.json({ message: "Modifier updated successfully", modifier: updatedModifier });
    } catch (error) {
        console.error("Modifier update failed:", error);
        res.status(500).json({ error: "Modifier update failed" });
    }
};

const deleteModifierById = async (req, res) => {
    try {
        const modifierId = req.params.id;
        const deletedModifier = await Modifier.findByIdAndDelete(modifierId);
        res.json({ message: "Modifier deleted successfully", modifier: deletedModifier });
    } catch (error) {
        console.error("Modifier deletion failed:", error);
        res.status(500).json({ error: "Modifier deletion failed" });
    }
};

module.exports = {
    createModifier,
    getAllModifiers,
    getModifierById,
    updateModifierById,
    deleteModifierById,
};
