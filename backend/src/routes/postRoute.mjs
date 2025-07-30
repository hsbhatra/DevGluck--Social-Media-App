import express from "express";
import { protect } from "../middleware/authMiddleware.mjs";
import upload from "../middleware/multer.mjs";
import { handleMulterError } from "../middleware/multerErrorHandler.mjs";
import {
  addNewPost,
  getAllPosts,
  getUserPosts,
  deletePost,
  likePost,
  addComment,
  getCommentsOfPost
} from "../controllers/postController.mjs";

const router = express.Router();

router.route("/addpost").post(protect, upload, handleMulterError, addNewPost);
router.route("/all").get(protect, getAllPosts);
router.route("/userpost").get(protect, getUserPosts);
router.route("/userpost/:userId").get(protect, getUserPosts);
router.route("/delete/:postId").delete(protect, deletePost);
router.route("/:postId/like").post(protect, likePost);
router.route("/:postId/comment").post(protect, addComment); 
router.route("/:postId/comment/all").get(protect, getCommentsOfPost);

export default router;