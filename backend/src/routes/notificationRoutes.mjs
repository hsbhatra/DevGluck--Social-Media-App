import express from "express";
import { getUserNotifications } from "../controllers/notificationController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", protect, getUserNotifications);

export default router;
