import express from "express";
import authRoutes from "./authRoutes.mjs";
import userRoutes from "./userRoutes.mjs";
import notificationRoutes from "./notificationRoutes.mjs";
import followRoutes from "./followRoutes.mjs";
import messageRoutes from "./messageRoute.mjs";
import postRoutes from "./postRoute.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/notifications", protect, notificationRoutes);
router.use("/users", protect, userRoutes);
router.use("/users/follow", protect, followRoutes);
router.use("/messages", protect, messageRoutes);
router.use("/posts", protect, postRoutes);

// -----------------------------------------------------------

// Temporary route for testing purposes:
// This route will only be accessible if the user is authenticated (checks user is authenticated/loggedIn or not).
// Uncomment the below given route to test protect middleware.

// router.get("/test-protected", protect, (req, res) => {
//   res.json({
//     message: "Access granted",
//     user: req.user
//   });
// });

// NOTE:
// Use protect middleware to secure access to the other routes for logged in users only.

// -----------------------------------------------------------

export default router;
