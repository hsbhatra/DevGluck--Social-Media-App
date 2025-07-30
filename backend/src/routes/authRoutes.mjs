import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;