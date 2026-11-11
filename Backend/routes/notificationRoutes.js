
import express from "express";

import {
    addNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification
} from "../controllers/Notification/add_notification.js";

const router = express.Router();

router.post("/", addNotification);
router.get("/", getAllNotifications);
router.get("/:id", getNotificationById);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

export default router;
