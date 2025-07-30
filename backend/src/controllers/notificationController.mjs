import { Notification } from "../models/notificationModel.mjs";

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // coming from authMiddleware

    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .populate("sender", "username firstName lastName profileImage") // sender info
      .populate("targetId"); // post or comment etc.

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};
