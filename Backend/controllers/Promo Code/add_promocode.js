
import PromoCode from "../../model/PromoCode.js";

// Add PromoCode
export const addPromoCode = async (req, res) => {
    try {
        const { code } = req.body;

        const promoExist = await PromoCode.findOne({ code: code?.toUpperCase() });

        if (promoExist) {
            return res.status(409).json({
                message: "Promo code already exists."
            });
        }

        const promoCreated = await PromoCode.create(req.body);

        return res.status(201).json({
            message: "Promo code added successfully.",
            promoCode: promoCreated
        });
    } catch (error) {
        console.error("Add PromoCode Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All PromoCodes
export const getAllPromoCodes = async (req, res) => {
    try {
        const promoCodes = await PromoCode.find();

        return res.status(200).json({ promoCodes });
    } catch (error) {
        console.error("Get PromoCodes Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get PromoCode By ID
export const getPromoCodeById = async (req, res) => {
    try {
        const promoCode = await PromoCode.findById(req.params.id);

        if (!promoCode) {
            return res.status(404).json({ message: "Promo code not found." });
        }

        return res.status(200).json({ promoCode });
    } catch (error) {
        console.error("Get PromoCode Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update PromoCode
export const updatePromoCode = async (req, res) => {
    try {
        const promoUpdated = await PromoCode.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!promoUpdated) {
            return res.status(404).json({ message: "Promo code not found." });
        }

        return res.status(200).json({
            message: "Promo code updated successfully.",
            promoCode: promoUpdated
        });
    } catch (error) {
        console.error("Update PromoCode Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete PromoCode
export const deletePromoCode = async (req, res) => {
    try {
        const promoDeleted = await PromoCode.findByIdAndDelete(req.params.id);

        if (!promoDeleted) {
            return res.status(404).json({ message: "Promo code not found." });
        }

        return res.status(200).json({
            message: "Promo code deleted successfully."
        });
    } catch (error) {
        console.error("Delete PromoCode Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
