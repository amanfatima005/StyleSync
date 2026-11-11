
import express from "express";

import {
    addPromoCode,
    getAllPromoCodes,
    getPromoCodeById,
    updatePromoCode,
    deletePromoCode
} from "../controllers/Promo Code/add_promocode.js";

const router = express.Router();

router.post("/", addPromoCode);
router.get("/", getAllPromoCodes);
router.get("/:id", getPromoCodeById);
router.put("/:id", updatePromoCode);
router.delete("/:id", deletePromoCode);

export default router;
