import mongoose from "mongoose";
import bcrypt from "bcrypt";

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    avatar: {
      type: String, // URL to profile image
      default: "https://i.pravatar.cc/40?img=4", // Can be updated later
    },

    bio: {
      type: String,
      maxlength: 150,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
    },

    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Check if account is locked (temporary locked after too many failed attempts)
userSchema.methods.isLocked = function () {
  return this.lockUntil && this.lockUntil > new Date();
};

export const User = mongoose.model("User", userSchema);
