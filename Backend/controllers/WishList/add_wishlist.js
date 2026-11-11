
import Wishlist from "../../model/Wishlist.js";

// Add Wishlist
export const addWishlist = async (req, res) => {
    try {
        const { user } = req.body;

        if (!user) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const wishlistExist = await Wishlist.findOne({ user });

        if (wishlistExist) {
            return res.status(409).json({ message: "Wishlist already exists." });
        }

        const wishlistCreated = await Wishlist.create(req.body);

        return res.status(201).json({
            message: "Wishlist created successfully.",
            wishlist: wishlistCreated
        });
    } catch (error) {
        console.error("Add Wishlist Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Wishlists
export const getAllWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.find()
            .populate("user")
            .populate("products");

        return res.status(200).json({ wishlists });
    } catch (error) {
        console.error("Get Wishlists Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Wishlist By ID
export const getWishlistById = async (req, res) => {
    try {
        const wishlist = await Wishlist.findById(req.params.id)
            .populate("user")
            .populate("products");

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found." });
        }

        return res.status(200).json({ wishlist });
    } catch (error) {
        console.error("Get Wishlist Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Wishlist
export const updateWishlist = async (req, res) => {
    try {
        const wishlistUpdated = await Wishlist.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!wishlistUpdated) {
            return res.status(404).json({ message: "Wishlist not found." });
        }

        return res.status(200).json({
            message: "Wishlist updated successfully.",
            wishlist: wishlistUpdated
        });
    } catch (error) {
        console.error("Update Wishlist Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Wishlist
export const deleteWishlist = async (req, res) => {
    try {
        const wishlistDeleted = await Wishlist.findByIdAndDelete(req.params.id);

        if (!wishlistDeleted) {
            return res.status(404).json({ message: "Wishlist not found." });
        }

        return res.status(200).json({ message: "Wishlist deleted successfully." });
    } catch (error) {
        console.error("Delete Wishlist Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
