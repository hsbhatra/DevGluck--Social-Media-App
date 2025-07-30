import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getNotifications } from "../api/notificationApi";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Body */}
      <motion.div 
        className="max-w-2xl mx-auto px-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-xl font-bold text-gray-800 mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Notifications
        </motion.h1>
        <motion.hr 
          className="mb-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <AnimatePresence>
          {loading ? (
            <motion.div 
              className="text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Loading...
            </motion.div>
          ) : notifications.length === 0 ? (
            <motion.div 
              className="text-center text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              No notifications found.
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification._id}
                  className="flex items-start gap-4 bg-white rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.4 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -2, 
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.img
                    src={notification.sender?.profileImage || "/default-avatar.png"}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">{notification.sender?.username}</span>{" "}
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default NotificationsPage;
