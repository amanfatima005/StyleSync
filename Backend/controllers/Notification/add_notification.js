
import Notification from "../../model/Notification.js";

// Add Notification
export const addNotification = async (req, res) => {
    try {
        const notificationCreated = await Notification.create(req.body);

        return res.status(201).json({
            message: "Notification created successfully.",
            notification: notificationCreated
        });
    } catch (error) {
        console.error("Add Notification Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Notifications
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .populate("user", "name email");

        return res.status(200).json({ notifications });
    } catch (error) {
        console.error("Get Notifications Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Notification By ID
export const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
            .populate("user", "name email");

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found."
            });
        }

        return res.status(200).json({ notification });
    } catch (error) {
        console.error("Get Notification Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update Notification
export const updateNotification = async (req, res) => {
    try {
        const notificationUpdated = await Notification.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true, runValidators: true }
        );

        if (!notificationUpdated) {
            return res.status(404).json({
                message: "Notification not found."
            });
        }

        return res.status(200).json({
            message: "Notification updated successfully.",
            notification: notificationUpdated
        });
    } catch (error) {
        console.error("Update Notification Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Notification
export const deleteNotification = async (req, res) => {
    try {
        const notificationDeleted = await Notification.findByIdAndDelete(
            req.params.id
        );

        if (!notificationDeleted) {
            return res.status(404).json({
                message: "Notification not found."
            });
        }

        return res.status(200).json({
            message: "Notification deleted successfully."
        });
    } catch (error) {
        console.error("Delete Notification Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
