import express from 'express';
import {
    deactivateUser,
    softDeleteUser,
    getAllUsers,
    getUserByUsername,
    getUserById,
    updateUserProfile,
    changePassword,
    searchUser,
} from '../controllers/userController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/id/:id", protect, getUserById);
router.get("/username/:username", protect, getUserByUsername);
router.put("/update-profile", protect, updateUserProfile);
router.put("/change-password", protect, changePassword);
router.put('/deactivate', protect, deactivateUser);
router.delete('/delete', protect, softDeleteUser);
router.get('/search', protect, searchUser);


export default router;