
import Order from "../../model/Order.js";

// Add Order
export const addOrder = async (req, res) => {
    try {
        const orderCreated = await Order.create(req.body);

        return res.status(201).json({
            message: "Order placed successfully.",
            order: orderCreated
        });
    } catch (error) {
        console.error("Add Order Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("items.product")
            .populate("address")
            .populate("payment");

        return res.status(200).json({ orders });
    } catch (error) {
        console.error("Get Orders Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Order By ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user")
            .populate("items.product")
            .populate("address")
            .populate("payment");

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json({ order });
    } catch (error) {
        console.error("Get Order Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Order
export const updateOrder = async (req, res) => {
    try {
        const orderUpdated = await Order.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!orderUpdated) {
            return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json({
            message: "Order updated successfully.",
            order: orderUpdated
        });
    } catch (error) {
        console.error("Update Order Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Order
export const deleteOrder = async (req, res) => {
    try {
        const orderDeleted = await Order.findByIdAndDelete(req.params.id);

        if (!orderDeleted) {
            return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
        console.error("Delete Order Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
