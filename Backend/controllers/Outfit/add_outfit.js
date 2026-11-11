
import Outfit from "../../model/Outfit.js";

// Add Outfit
export const addOutfit = async (req, res) => {
    try {
        const outfitCreated = await Outfit.create(req.body);

        return res.status(201).json({
            message: "Outfit created successfully.",
            outfit: outfitCreated
        });
    } catch (error) {
        console.error("Add Outfit Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Outfits
export const getAllOutfits = async (req, res) => {
    try {
        const outfits = await Outfit.find()
            .populate("user", "name")
            .populate("dress")
            .populate("jewellery")
            .populate("shoes")
            .populate("bag");

        return res.status(200).json({ outfits });
    } catch (error) {
        console.error("Get Outfits Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Outfit By ID
export const getOutfitById = async (req, res) => {
    try {
        const outfit = await Outfit.findById(req.params.id)
            .populate("user", "name")
            .populate("dress")
            .populate("jewellery")
            .populate("shoes")
            .populate("bag");

        if (!outfit) {
            return res.status(404).json({ message: "Outfit not found." });
        }

        return res.status(200).json({ outfit });
    } catch (error) {
        console.error("Get Outfit Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Outfit
export const updateOutfit = async (req, res) => {
    try {
        const outfitUpdated = await Outfit.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!outfitUpdated) {
            return res.status(404).json({ message: "Outfit not found." });
        }

        return res.status(200).json({
            message: "Outfit updated successfully.",
            outfit: outfitUpdated
        });
    } catch (error) {
        console.error("Update Outfit Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Outfit
export const deleteOutfit = async (req, res) => {
    try {
        const outfitDeleted = await Outfit.findByIdAndDelete(req.params.id);

        if (!outfitDeleted) {
            return res.status(404).json({ message: "Outfit not found." });
        }

        return res.status(200).json({
            message: "Outfit deleted successfully."
        });
    } catch (error) {
        console.error("Delete Outfit Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
