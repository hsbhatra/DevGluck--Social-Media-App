import { User } from "../models/userModel.mjs";

// --------------------------------------------------------------------
// Controller: Deactivate User Account (temporary deactivation)
export const deactivateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required to deactivate account" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: "Account deactivated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Deactivation failed", error: err.message });
  }
};

// --------------------------------------------------------------------
// Controller: Soft Delete User (mark isDeleted true for permanent deletion of account after verifying password)
export const softDeleteUser = async (req, res) => {
  const userId = req.user._id;
  const { password } = req.body;

  try {
    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required to delete account" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Password match check
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Soft delete user
    user.isDeleted = true;
    user.isActive = false; // Ensure account is inactive
    await user.save();

    return res.json({ message: "User account soft-deleted successfully" });
  } catch (err) {
    console.error("Soft delete error:", err);
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
};

// ---------------------------------------------------------------------
// Controller: Get all users (excluding deleted ones)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false })
      .select("-password") // Exclude password & internal fields
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};

// ---------------------------------------------------------------------
// Controller: Get user by username
export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username, isDeleted: false }).select(
      "-password -email -loginAttempts -lockUntil -isDeleted"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error while fetching user." });
  }
};

// ---------------------------------------------------------------------
// Controller: Get user by ID (excluding deleted accounts)
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id, isDeleted: false }).select(
      "-password -email -loginAttempts -lockUntil -isDeleted"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error while fetching user." });
  }
};

// ---------------------------------------------------------------------
// Controller: Update User Profile (bio, avatar)
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware
    const { bio, avatar } = req.body;

    const user = await User.findById(userId);

    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found." });
    }

    if (bio !== undefined) user.bio = bio.trim();
    if (avatar !== undefined) user.avatar = avatar.trim();

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        username: user.username,
        email: user.email,
        // role: user.role,
        avatar: user.avatar,
        bio: user.bio,
      },
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile." });
  }
};

// ---------------------------------------------------------------------
// Controller: Change password for logged-in user
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    // 1. Check for missing fields
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2. Get user from database
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 3. Validate current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    }

    // 4. Check new password === confirm password
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirmation do not match." });
    }

    // 5. Ensure new password ≠ current password
    const isSame = await user.matchPassword(newPassword);
    if (isSame) {
      return res
        .status(400)
        .json({
          message: "New password must be different from current password.",
        });
    }

    // 6. Validate strength of new password
    if (!isValidStrongPassword(newPassword)) {
      return res.status(400).json({
        message:
          "New password must be at least 9 characters and include uppercase, lowercase, number, and special character.",
      });
    }

    // 7. Update password and save
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error while changing password." });
  }
};


export const searchUser = async (req, res) => {
  const keyword = req.query.search ? {
    $or: [
      { username: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } }
    ]
  } : {};
  try {
    const searchUsers = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select('username avatar _id');
    console.log(searchUsers);
    res.status(200).send(searchUsers);
  } catch (err) {
    res.send(err);
    console.log(err);
  }

};

