
import express from "express";

import {
    addPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} from "../controllers/Payment/add_payment.js";

const router = express.Router();

router.post("/", addPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;
