import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Unisex"],
        default: "Unisex",
    },
    images: [{
        type: String,
    }],
    sizes: [{
        type: String,
    }],
    colors: [{
        type: String,
    }],
    stock: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;