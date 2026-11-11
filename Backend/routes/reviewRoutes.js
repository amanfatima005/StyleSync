
import express from "express";

import {
    addReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} from "../controllers/Review/add_review.js";

const router = express.Router();

router.post("/", addReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
