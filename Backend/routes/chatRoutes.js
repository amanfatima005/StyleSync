
import express from "express";

import {
    addChat,
    getAllChats,
    getChatById,
    updateChat,
    deleteChat
} from "../controllers/Chat/add_chat.js";

const router = express.Router();

router.post("/", addChat);
router.get("/", getAllChats);
router.get("/:id", getChatById);
router.put("/:id", updateChat);
router.delete("/:id", deleteChat);

export default router;
