
import express from "express";

import {
    addCart,
    getAllCarts,
    getCartById,
    updateCart,
    deleteCart
} from "../controllers/Cart/add_cart.js";

const router = express.Router();

router.post("/", addCart);
router.get("/", getAllCarts);
router.get("/:id", getCartById);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);

export default router;
