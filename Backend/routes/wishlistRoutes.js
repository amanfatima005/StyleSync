
import express from "express";

import {
    addWishlist,
    getAllWishlists,
    getWishlistById,
    updateWishlist,
    deleteWishlist
} from "../controllers/Wishlist/add_wishlist.js";

const router = express.Router();

router.post("/", addWishlist);
router.get("/", getAllWishlists);
router.get("/:id", getWishlistById);
router.put("/:id", updateWishlist);
router.delete("/:id", deleteWishlist);

export default router;
