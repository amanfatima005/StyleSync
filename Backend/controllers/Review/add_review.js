
import Review from "../../model/Review.js";

// Add Review
export const addReview = async (req, res) => {
    try {
        const { user, product, rating } = req.body;

        if (!user || !product || !rating) {
            return res.status(400).json({
                message: "User, product and rating are required."
            });
        }

        const reviewExist = await Review.findOne({ user, product });

        if (reviewExist) {
            return res.status(409).json({
                message: "You have already reviewed this product."
            });
        }

        const reviewCreated = await Review.create(req.body);

        return res.status(201).json({
            message: "Review added successfully.",
            review: reviewCreated
        });
    } catch (error) {
        console.error("Add Review Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("user", "name")
            .populate("product");

        return res.status(200).json({ reviews });
    } catch (error) {
        console.error("Get Reviews Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Review By ID
export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate("user", "name")
            .populate("product");

        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        return res.status(200).json({ review });
    } catch (error) {
        console.error("Get Review Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Review
export const updateReview = async (req, res) => {
    try {
        const reviewUpdated = await Review.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!reviewUpdated) {
            return res.status(404).json({ message: "Review not found." });
        }

        return res.status(200).json({
            message: "Review updated successfully.",
            review: reviewUpdated
        });
    } catch (error) {
        console.error("Update Review Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Review
export const deleteReview = async (req, res) => {
    try {
        const reviewDeleted = await Review.findByIdAndDelete(req.params.id);

        if (!reviewDeleted) {
            return res.status(404).json({ message: "Review not found." });
        }

        return res.status(200).json({
            message: "Review deleted successfully."
        });
    } catch (error) {
        console.error("Delete Review Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
