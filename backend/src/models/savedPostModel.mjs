import mongoose from "mongoose";

const savedPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to ensure a user can't save the same post twice
savedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const SavedPost = mongoose.model("SavedPost", savedPostSchema);
