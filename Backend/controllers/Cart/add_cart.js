
import Cart from "../../model/Cart.js";

// Add Cart
export const addCart = async (req, res) => {
    try {
        const { user } = req.body;

        if (!user) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const cartExist = await Cart.findOne({ user });

        if (cartExist) {
            return res.status(409).json({ message: "Cart already exists." });
        }

        const cartCreated = await Cart.create(req.body);

        return res.status(201).json({
            message: "Cart created successfully.",
            cart: cartCreated
        });
    } catch (error) {
        console.error("Add Cart Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Carts
export const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate("user")
            .populate("items.product");

        return res.status(200).json({ carts });
    } catch (error) {
        console.error("Get Carts Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Cart By ID
export const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
            .populate("user")
            .populate("items.product");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        return res.status(200).json({ cart });
    } catch (error) {
        console.error("Get Cart Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Cart
export const updateCart = async (req, res) => {
    try {
        const cartUpdated = await Cart.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!cartUpdated) {
            return res.status(404).json({ message: "Cart not found." });
        }

        return res.status(200).json({
            message: "Cart updated successfully.",
            cart: cartUpdated
        });
    } catch (error) {
        console.error("Update Cart Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Cart
export const deleteCart = async (req, res) => {
    try {
        const cartDeleted = await Cart.findByIdAndDelete(req.params.id);

        if (!cartDeleted) {
            return res.status(404).json({ message: "Cart not found." });
        }

        return res.status(200).json({ message: "Cart deleted successfully." });
    } catch (error) {
        console.error("Delete Cart Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
