
import Payment from "../../model/Payment.js";

// Add Payment
export const addPayment = async (req, res) => {
    try {
        const paymentCreated = await Payment.create(req.body);

        return res.status(201).json({
            message: "Payment record created successfully.",
            payment: paymentCreated
        });
    } catch (error) {
        console.error("Add Payment Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Payments
export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("user", "-password");

        return res.status(200).json({ payments });
    } catch (error) {
        console.error("Get Payments Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Payment By ID
export const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate("user", "-password");

        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }

        return res.status(200).json({ payment });
    } catch (error) {
        console.error("Get Payment Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Payment
export const updatePayment = async (req, res) => {
    try {
        const paymentUpdated = await Payment.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!paymentUpdated) {
            return res.status(404).json({ message: "Payment not found." });
        }

        return res.status(200).json({
            message: "Payment updated successfully.",
            payment: paymentUpdated
        });
    } catch (error) {
        console.error("Update Payment Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Payment
export const deletePayment = async (req, res) => {
    try {
        const paymentDeleted = await Payment.findByIdAndDelete(req.params.id);

        if (!paymentDeleted) {
            return res.status(404).json({ message: "Payment not found." });
        }

        return res.status(200).json({
            message: "Payment deleted successfully."
        });
    } catch (error) {
        console.error("Delete Payment Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
