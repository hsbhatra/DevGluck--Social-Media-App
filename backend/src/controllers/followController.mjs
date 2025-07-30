import { Follow } from "../models/followModel.mjs";
import { User } from "../models/userModel.mjs";
import mongoose from "mongoose";

// Follow a user
export const followUser = async (req, res) => {
  try {
    const { userId } = req.params; // User to follow
    const followerId = req.user.id; // Current authenticated user

    // Validation checks
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_USER_ID",
        message: "Invalid user ID format"
      });
    }

    if (followerId === userId) {
      return res.status(400).json({
        success: false,
        error: "INVALID_OPERATION",
        message: "You cannot follow yourself"
      });
    }

    // Check if user to follow exists and is active
    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        error: "USER_NOT_FOUND",
        message: "User does not exist"
      });
    }

    // Check if user is active and not deleted
    if (!userToFollow.isActive || userToFollow.isDeleted) {
      return res.status(400).json({
        success: false,
        error: "USER_UNAVAILABLE",
        message: "This user account is not available for following"
      });
    }

    // Verify current user is also active and not deleted
    const currentUser = await User.findById(followerId);
    if (!currentUser || !currentUser.isActive || currentUser.isDeleted) {
      return res.status(403).json({
        success: false,
        error: "ACCOUNT_INACTIVE",
        message: "Your account is not active"
      });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: userId
    });

    if (existingFollow) {
      return res.status(409).json({
        success: false,
        error: "ALREADY_FOLLOWING",
        message: "You are already following this user"
      });
    }

    // Create follow relationship
    const follow = new Follow({
      follower: followerId,
      following: userId
    });

    await follow.save();

    res.status(201).json({
      success: true,
      message: "Successfully followed user",
      data: {
        follower_id: followerId,
        following_id: userId,
        followed_at: follow.createdAt,
        user_info: {
          username: userToFollow.username,
          firstName: userToFollow.firstName,
          lastName: userToFollow.lastName,
          avatar: userToFollow.avatar
        }
      }
    });

  } catch (error) {
    console.error("Follow user error:", error);
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while following the user"
    });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params; // User to unfollow
    const followerId = req.user.id; // Current authenticated user

    // Validation checks
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_USER_ID",
        message: "Invalid user ID format"
      });
    }

    // Verify current user is active and not deleted
    const currentUser = await User.findById(followerId);
    if (!currentUser || !currentUser.isActive || currentUser.isDeleted) {
      return res.status(403).json({
        success: false,
        error: "ACCOUNT_INACTIVE",
        message: "Your account is not active"
      });
    }

    // Find and delete the follow relationship
    const follow = await Follow.findOneAndDelete({
      follower: followerId,
      following: userId
    });

    if (!follow) {
      return res.status(400).json({
        success: false,
        error: "NOT_FOLLOWING",
        message: "You are not following this user"
      });
    }

    // Get user info for response (optional, even if user is inactive/deleted)
    const userInfo = await User.findById(userId, 'username firstName lastName avatar');

    res.status(200).json({
      success: true,
      message: "Successfully unfollowed user",
      data: {
        follower_id: followerId,
        unfollowed_id: userId,
        unfollowed_at: new Date(),
        user_info: userInfo ? {
          username: userInfo.username,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          avatar: userInfo.avatar
        } : null
      }
    });

  } catch (error) {
    console.error("Unfollow user error:", error);
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while unfollowing the user"
    });
  }
};

// Check follow status
export const getFollowStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_USER_ID",
        message: "Invalid user ID format"
      });
    }

    // Verify current user is active and not deleted
    const currentUser = await User.findById(followerId);
    if (!currentUser || !currentUser.isActive || currentUser.isDeleted) {
      return res.status(403).json({
        success: false,
        error: "ACCOUNT_INACTIVE",
        message: "Your account is not active"
      });
    }

    // Get target user info
    const targetUser = await User.findById(userId, 'username firstName lastName avatar isActive isDeleted');
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        error: "USER_NOT_FOUND",
        message: "User does not exist"
      });
    }

    // Check follow relationship
    const follow = await Follow.findOne({
      follower: followerId,
      following: userId
    });

    res.status(200).json({
      success: true,
      data: {
        is_following: !!follow,
        followed_at: follow ? follow.createdAt : null,
        user_info: {
          username: targetUser.username,
          firstName: targetUser.firstName,
          lastName: targetUser.lastName,
          avatar: targetUser.avatar,
          is_active: targetUser.isActive && !targetUser.isDeleted
        },
        can_follow: targetUser.isActive && !targetUser.isDeleted && followerId !== userId
      }
    });

  } catch (error) {
    console.error("Get follow status error:", error);
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while checking follow status"
    });
  }
};

// Get all followers of a user
export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Validation checks
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_USER_ID",
        message: "Invalid user ID format"
      });
    }

    // Verify current user is active and not deleted
    const currentUser = await User.findById(currentUserId);
    if (!currentUser || !currentUser.isActive || currentUser.isDeleted) {
      return res.status(403).json({
        success: false,
        error: "ACCOUNT_INACTIVE",
        message: "Your account is not active"
      });
    }

    // Check if target user exists
    const targetUser = await User.findById(userId, 'username firstName lastName avatar isActive isDeleted');
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        error: "USER_NOT_FOUND",
        message: "User does not exist"
      });
    }

    // Get total count of followers
    const totalFollowers = await Follow.countDocuments({ following: userId });

    // Get followers with user details
    const followers = await Follow.aggregate([
      { $match: { following: new mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'follower',
          foreignField: '_id',
          as: 'followerDetails'
        }
      },
      { $unwind: '$followerDetails' },
      {
        $match: {
          'followerDetails.isActive': true,
          'followerDetails.isDeleted': { $ne: true }
        }
      },
      {
        $project: {
          _id: 1,
          followed_at: '$createdAt',
          user: {
            _id: '$followerDetails._id',
            username: '$followerDetails.username',
            firstName: '$followerDetails.firstName',
            lastName: '$followerDetails.lastName',
            avatar: '$followerDetails.avatar',
            bio: '$followerDetails.bio'
          }
        }
      }
    ]);

    // Check if current user follows each follower
    const followersWithFollowStatus = await Promise.all(
      followers.map(async (follower) => {
        const isFollowing = await Follow.findOne({
          follower: currentUserId,
          following: follower.user._id
        });

        return {
          ...follower,
          is_following_back: !!isFollowing
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        followers: followersWithFollowStatus,
        pagination: {
          current_page: page,
          total_pages: Math.ceil(totalFollowers / limit),
          total_followers: totalFollowers,
          has_next: page * limit < totalFollowers,
          has_prev: page > 1
        },
        target_user: {
          _id: targetUser._id,
          username: targetUser.username,
          firstName: targetUser.firstName,
          lastName: targetUser.lastName,
          avatar: targetUser.avatar
        }
      }
    });

  } catch (error) {
    console.error("Get followers error:", error);
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while fetching followers"
    });
  }
};

// Get all users that a user is following
export const getFollowings = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Validation checks
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_USER_ID",
        message: "Invalid user ID format"
      });
    }

    // Verify current user is active and not deleted
    const currentUser = await User.findById(currentUserId);
    if (!currentUser || !currentUser.isActive || currentUser.isDeleted) {
      return res.status(403).json({
        success: false,
        error: "ACCOUNT_INACTIVE",
        message: "Your account is not active"
      });
    }

    // Check if target user exists
    const targetUser = await User.findById(userId, 'username firstName lastName avatar isActive isDeleted');
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        error: "USER_NOT_FOUND",
        message: "User does not exist"
      });
    }

    // Get total count of followings
    const totalFollowings = await Follow.countDocuments({ follower: userId });

    // Get followings with user details
    const followings = await Follow.aggregate([
      { $match: { follower: new mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'following',
          foreignField: '_id',
          as: 'followingDetails'
        }
      },
      { $unwind: '$followingDetails' },
      {
        $match: {
          'followingDetails.isActive': true,
          'followingDetails.isDeleted': { $ne: true }
        }
      },
      {
        $project: {
          _id: 1,
          followed_at: '$createdAt',
          user: {
            _id: '$followingDetails._id',
            username: '$followingDetails.username',
            firstName: '$followingDetails.firstName',
            lastName: '$followingDetails.lastName',
            avatar: '$followingDetails.avatar',
            bio: '$followingDetails.bio'
          }
        }
      }
    ]);

    // Check if current user follows each following
    const followingsWithFollowStatus = await Promise.all(
      followings.map(async (following) => {
        const isFollowing = await Follow.findOne({
          follower: currentUserId,
          following: following.user._id
        });

        return {
          ...following,
          is_following_back: !!isFollowing
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        followings: followingsWithFollowStatus,
        pagination: {
          current_page: page,
          total_pages: Math.ceil(totalFollowings / limit),
          total_followings: totalFollowings,
          has_next: page * limit < totalFollowings,
          has_prev: page > 1
        },
        target_user: {
          _id: targetUser._id,
          username: targetUser.username,
          firstName: targetUser.firstName,
          lastName: targetUser.lastName,
          avatar: targetUser.avatar
        }
      }
    });

  } catch (error) {
    console.error("Get followings error:", error);
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while fetching followings"
    });
  }
};