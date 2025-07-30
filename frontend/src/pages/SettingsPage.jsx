import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Eye, Lock, HelpCircle, Info, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      className="min-h-screen bg-gray-50 px-2 sm:px-4 py-4 sm:py-6 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Container */}
      <motion.div 
        className="bg-white max-w-3xl mx-auto rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div 
          className="flex items-center px-3 sm:px-4 py-3 sm:py-4 border-b"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 text-gray-600" />
          </motion.div>
          <h1 className="text-base sm:text-lg font-semibold text-gray-800">Settings</h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="px-3 sm:px-4 py-3 border-b"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.input
            type="text"
            placeholder="Search for a setting..."
            className="w-full px-3 sm:px-4 py-2 bg-gray-100 rounded-md text-sm outline-none"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        {/* Settings Options */}
        <motion.div 
          className="divide-y"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <SettingItem icon={<User className="w-4 h-4 sm:w-5 sm:h-5" />} label="Account" path="/settings/account" navigate={navigate} delay={0.4} />
          <SettingItem icon={<Bell className="w-4 h-4 sm:w-5 sm:h-5" />} label="Notifications" path="/settings/notifications" navigate={navigate} delay={0.5} />
          <SettingItem icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5" />} label="Appearance" path="/settings/appearance" navigate={navigate} delay={0.6} />
          <SettingItem icon={<Lock className="w-4 h-4 sm:w-5 sm:h-5" />} label="Privacy & Security" path="/settings/privacy" navigate={navigate} delay={0.7} />
          <SettingItem icon={<HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />} label="Help and Support" path="/settings/help" navigate={navigate} delay={0.8} />
          <SettingItem icon={<Info className="w-4 h-4 sm:w-5 sm:h-5" />} label="About" path="/settings/about" navigate={navigate} delay={0.9} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SettingItem = ({ icon, label, path, navigate, delay }) => (
  <motion.div
    className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 hover:bg-gray-50 cursor-pointer transition-colors"
    onClick={() => navigate(path)}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ 
      backgroundColor: "#f9fafb",
      x: 5,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center space-x-3 sm:space-x-4 text-gray-700">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <span className="text-sm sm:text-base">{label}</span>
    </div>
    <motion.span 
      className="text-gray-400 text-sm sm:text-base"
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2 }}
    >
      ›
    </motion.span>
  </motion.div>
);

export default SettingsPage;
