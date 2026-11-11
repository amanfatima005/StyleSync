import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Unisex"],
    },
    dress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    jewellery: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    shoes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    bag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    occasion: {
        type: String,
        enum: ["Casual", "Formal", "Party", "Wedding", "Office", "Other"],
    },
    isAIGenerated: {
        type: Boolean,
        default: false,
    },
    isSaved: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

const Outfit = mongoose.model("Outfit", outfitSchema);

export default Outfit;