
import express from "express";

import {
    addOutfit,
    getAllOutfits,
    getOutfitById,
    updateOutfit,
    deleteOutfit
} from "../controllers/Outfit/add_outfit.js";

const router = express.Router();

router.post("/", addOutfit);
router.get("/", getAllOutfits);
router.get("/:id", getOutfitById);
router.put("/:id", updateOutfit);
router.delete("/:id", deleteOutfit);

export default router;
