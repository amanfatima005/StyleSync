
import express from "express";

import {
    addAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
} from "../controllers/Address/add_address.js";

const router = express.Router();

router.post("/", addAddress);
router.get("/", getAllAddresses);
router.get("/:id", getAddressById);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;
