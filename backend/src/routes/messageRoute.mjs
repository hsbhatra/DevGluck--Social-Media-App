import express from "express";
import { protect } from "../middleware/authMiddleware.mjs";
import { getMessage, sendMessage, getUserConversations } from "../controllers/messageController.mjs";

const router = express.Router();

router.route('/').get(protect, getUserConversations);
router.route('/send/:id').post(protect, sendMessage);
router.route('/all/:id').get(protect, getMessage);

export default router;