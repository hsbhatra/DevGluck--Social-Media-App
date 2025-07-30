import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "refType", // Enables dynamic population
    },

    refType: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
  },
  { timestamps: true }
);

// Prevent duplicate likes on the same post/comment
likeSchema.index({ userId: 1, refId: 1, refType: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);
