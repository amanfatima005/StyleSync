
import User from "../../model/User.js";
import bcrypt from "bcryptjs";

// Add User
export const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required."
            });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(409).json({
                message: "User already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userCreated = await User.create({
            ...req.body,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User created successfully.",
            userId: userCreated._id
        });

    } catch (error) {
        console.error("Add User Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json({
            message: "Users fetched successfully.",
            users
        });
    } catch (error) {
        console.error("Get Users Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Get User By ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({
            message: "User fetched successfully.",
            user
        });
    } catch (error) {
        console.error("Get User Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const userUpdated = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        if (!userUpdated) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({
            message: "User updated successfully.",
            user: userUpdated
        });
    } catch (error) {
        console.error("Update User Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const userDeleted = await User.findByIdAndDelete(req.params.id);

        if (!userDeleted) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({
            message: "User deleted successfully."
        });
    } catch (error) {
        console.error("Delete User Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
