
import Address from "../../model/Address.js";

// Add Address
export const addAddress = async (req, res) => {
    try {
        const addressCreated = await Address.create(req.body);

        return res.status(201).json({
            message: "Address added successfully.",
            address: addressCreated
        });
    } catch (error) {
        console.error("Add Address Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Addresses
export const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.find().populate("user", "-password");

        return res.status(200).json({ addresses });
    } catch (error) {
        console.error("Get Addresses Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Address By ID
export const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id)
            .populate("user", "-password");

        if (!address) {
            return res.status(404).json({ message: "Address not found." });
        }

        return res.status(200).json({ address });
    } catch (error) {
        console.error("Get Address Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Address
export const updateAddress = async (req, res) => {
    try {
        const addressUpdated = await Address.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!addressUpdated) {
            return res.status(404).json({ message: "Address not found." });
        }

        return res.status(200).json({
            message: "Address updated successfully.",
            address: addressUpdated
        });
    } catch (error) {
        console.error("Update Address Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Address
export const deleteAddress = async (req, res) => {
    try {
        const addressDeleted = await Address.findByIdAndDelete(req.params.id);

        if (!addressDeleted) {
            return res.status(404).json({ message: "Address not found." });
        }

        return res.status(200).json({
            message: "Address deleted successfully."
        });
    } catch (error) {
        console.error("Delete Address Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
