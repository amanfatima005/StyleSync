
import Category from "../../model/Category.js";

// Add Category
export const addCategory = async (req, res) => {
    try {
        const categoryCreated = await Category.create(req.body);

        return res.status(201).json({
            message: "Category added successfully.",
            category: categoryCreated
        });
    } catch (error) {
        console.error("Add Category Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate("parentCategory");

        return res.status(200).json({
            message: "Categories fetched successfully.",
            categories
        });
    } catch (error) {
        console.error("Get Categories Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Category By ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate("parentCategory");

        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }

        return res.status(200).json({
            message: "Category fetched successfully.",
            category
        });
    } catch (error) {
        console.error("Get Category Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Category
export const updateCategory = async (req, res) => {
    try {
        const categoryUpdated = await Category.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!categoryUpdated) {
            return res.status(404).json({ message: "Category not found." });
        }

        return res.status(200).json({
            message: "Category updated successfully.",
            category: categoryUpdated
        });
    } catch (error) {
        console.error("Update Category Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const categoryDeleted = await Category.findByIdAndDelete(req.params.id);

        if (!categoryDeleted) {
            return res.status(404).json({ message: "Category not found." });
        }

        return res.status(200).json({
            message: "Category deleted successfully."
        });
    } catch (error) {
        console.error("Delete Category Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
