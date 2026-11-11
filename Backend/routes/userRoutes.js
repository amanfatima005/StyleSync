
import express from "express";

import {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/User/add_user.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
