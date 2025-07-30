import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Bell, MessageCircle, User, LogOut, Menu, X, BookOpen } from "lucide-react";
import SearchComponent from "./search/Search";
import socket from "./chat/socket";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unreadMessages = useSelector((state) => state.chat.unreadMessages);
  const unreadCount = Object.values(unreadMessages || {}).reduce((a, b) => a + b, 0);



  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("currentUser");
    socket.disconnect();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavItem = ({ to, icon: Icon, label, mobileOnly = false, desktopOnly = false }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={to}
        className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive(to)
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
          } ${mobileOnly ? "sm:hidden" : ""} ${desktopOnly ? "hidden sm:flex" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span className="font-medium">{label}</span>
      </Link>
    </motion.div>
    // <Link
    //   to={to}
    //   className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive(to)
    //     ? "bg-blue-100 text-blue-600"
    //     : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
    //     } ${mobileOnly ? "sm:hidden" : ""} ${desktopOnly ? "hidden sm:flex" : ""}`}
    //   onClick={() => setIsMobileMenuOpen(false)}
    // >
    //   {Icon && <Icon className="w-5 h-5" />}
    //   <span className="font-medium">{label}</span>
    // </Link>
  );

  const MobileNavItem = ({ to, icon: Icon, label }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={to}
        className={`group flex flex-col items-center justify-center space-y-1 p-3 rounded-lg transition-all duration-200 ${isActive(to)
          ? "text-blue-600 bg-blue-50"
          : "text-gray-600 hover:text-blue-600"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {Icon && <Icon className="w-6 h-6" />}
        <span className="text-xs font-medium">{label}</span>
      </Link>
    </motion.div>
    // <Link
    //   to={to}
    //   className={`group flex flex-col items-center justify-center space-y-1 p-3 rounded-lg transition-all duration-200 ${isActive(to)
    //     ? "text-blue-600 bg-blue-50"
    //     : "text-gray-600 hover:text-blue-600"
    //     }`}
    //   onClick={() => setIsMobileMenuOpen(false)}
    // >
    //   {Icon && <Icon className="w-6 h-6" />}
    //   <span className="text-xs font-medium">{label}</span>
    // </Link>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="hidden sm:flex justify-between items-center w-full px-6 py-4 bg-white border-b shadow-sm fixed top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo & Brand */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div
            className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            DG
          </motion.div>
          <span className="text-xl font-semibold text-gray-800">DevGluck</span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="flex items-center space-x-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/notifications" icon={Bell} label="Notifications" />
          <div className="relative">
            <NavItem to="/messages" icon={MessageCircle} label="Messages" />
            {unreadCount > 0 && location.pathname !== "/messages" && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </div>

          <NavItem to="/blogs" icon={BookOpen} label="Blogs" />
          <NavItem to="/profile" icon={User} label="Profile" />
        </motion.div>

        {/* Search Bar */}
        {/* <div className="flex-1 max-w-md mx-8">
          <SearchComponent />
        </div> */}

        {/* User Actions */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
          {/* <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-sm object-cover hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate("/profile")}
          /> */}
        </motion.div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <motion.div
        className="sm:hidden fixed top-0 w-full bg-white border-b shadow-sm z-50 px-4 py-3"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.div
              className="bg-blue-600 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              DG
            </motion.div>
            <span className="text-lg font-semibold text-gray-800">DevGluck</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
            {/* <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500 shadow-sm object-cover"
              onClick={() => navigate("/profile")}
            /> */}
          </motion.div>
        </div>

        {/* Mobile Search Bar */}
        {/* <div className="mt-3">
          <SearchComponent />
        </div> */}
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <motion.div
        className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50`}
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <motion.button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <NavItem to="/" icon={Home} label="Home" />
            <NavItem to="/notifications" icon={Bell} label="Notifications" />
            <div className="relative">
              <MobileNavItem to="/messages" icon={MessageCircle} label="Chat" />
              {unreadCount > 0 && location.pathname !== "/messages" && (
                <span className="absolute top-0 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              )}
            </div>
            <NavItem to="/blogs" icon={BookOpen} label="Blogs" />
            <NavItem to="/profile" icon={User} label="Profile" />

            <div className="border-t pt-4 mt-4">
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <motion.div
        className="sm:hidden fixed bottom-0 w-full backdrop-blur-md bg-white/90 border-t border-gray-200 shadow-xl flex justify-around items-center py-2 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <MobileNavItem to="/" icon={Home} label="Home" />
        <MobileNavItem to="/notifications" icon={Bell} label="Alerts" />
        <MobileNavItem to="/messages" icon={MessageCircle} label="Chat" />
        <MobileNavItem to="/blogs" icon={BookOpen} label="Blogs" />
        <MobileNavItem to="/profile" icon={User} label="Profile" />
      </motion.div>
    </>
  );
};

export default Navbar; 