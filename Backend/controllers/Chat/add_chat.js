
import Chat from "../../model/Chat.js";

// Add Chat
export const addChat = async (req, res) => {
    try {
        const chatCreated = await Chat.create(req.body);

        return res.status(201).json({
            message: "Chat created successfully.",
            chat: chatCreated
        });
    } catch (error) {
        console.error("Add Chat Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Chats
export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find().populate("user", "name email");

        return res.status(200).json({ chats });
    } catch (error) {
        console.error("Get Chats Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Chat By ID
export const getChatById = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
            .populate("user", "name email");

        if (!chat) {
            return res.status(404).json({ message: "Chat not found." });
        }

        return res.status(200).json({ chat });
    } catch (error) {
        console.error("Get Chat Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Chat
export const updateChat = async (req, res) => {
    try {
        const chatUpdated = await Chat.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!chatUpdated) {
            return res.status(404).json({ message: "Chat not found." });
        }

        return res.status(200).json({
            message: "Chat updated successfully.",
            chat: chatUpdated
        });
    } catch (error) {
        console.error("Update Chat Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Chat
export const deleteChat = async (req, res) => {
    try {
        const chatDeleted = await Chat.findByIdAndDelete(req.params.id);

        if (!chatDeleted) {
            return res.status(404).json({ message: "Chat not found." });
        }

        return res.status(200).json({
            message: "Chat deleted successfully."
        });
    } catch (error) {
        console.error("Delete Chat Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
