
import Product from "../../model/Product.js";

// 1. Add Product
export const addProduct = async (req, res) => {
    try {
        const productCreated = await Product.create(req.body);

        return res.status(201).json({
            message: "Product added successfully.",
            product: productCreated
        });

    } catch (error) {
        console.error("Add Product Error:", error);
        return res.status(500).json({
            message: "Something went wrong.",
            error: error.message
        });
    }
};

// 2. Get All Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category");

        return res.status(200).json({
            message: "Products fetched successfully.",
            products
        });

    } catch (error) {
        console.error("Get Products Error:", error);
        return res.status(500).json({
            message: "Something went wrong.",
            error: error.message
        });
    }
};

// 3. Get Product By ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category");

        if (!product) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully.",
            product
        });

    } catch (error) {
        console.error("Get Product Error:", error);
        return res.status(500).json({
            message: "Something went wrong.",
            error: error.message
        });
    }
};

// 4. Update Product
export const updateProduct = async (req, res) => {
    try {
        const productUpdated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!productUpdated) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        return res.status(200).json({
            message: "Product updated successfully.",
            product: productUpdated
        });

    } catch (error) {
        console.error("Update Product Error:", error);
        return res.status(500).json({
            message: "Something went wrong.",
            error: error.message
        });
    }
};

// 5. Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const productDeleted = await Product.findByIdAndDelete(req.params.id);

        if (!productDeleted) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully."
        });

    } catch (error) {
        console.error("Delete Product Error:", error);
        return res.status(500).json({
            message: "Something went wrong.",
            error: error.message
        });
    }
};
