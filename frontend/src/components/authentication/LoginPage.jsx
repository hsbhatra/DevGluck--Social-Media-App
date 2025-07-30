import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "../Other/FormInput";
import { EmailIcon, LockIcon } from "../Other/Icons";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../slices/UserSlice";
import Loader from "../loaders/Loader";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    let errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    setError(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const res = await dispatch(signInUser(formData));
      if (signInUser.fulfilled.match(res)) {
        console.log("Login Success:", res.payload);
        // Redirect to home page after successful login
        navigate("/");
      } else {
        // signInUser Promise Rejected
        alert(res.error?.message || "Login failed");
      }
      navigate("/"); // Redirect to home page after login
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="w-12/12 h-12/12 fixed top-0 left-0 z-50 bg-white opacity-90 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="w-full min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row flex-grow items-center justify-center p-4">
          <motion.div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h2
              className="text-3xl font-bold text-center mb-8 text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Welcome Back
            </motion.h2>

            <motion.form
              className="space-y-6"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  error={error.email}
                  icon={<EmailIcon />}
                  value={formData.email}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <FormInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  error={error.password}
                  showPasswordToggle={true}
                  icon={<LockIcon />}
                  value={formData.password}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div
                className="flex items-center justify-between text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              // transition={{ duration: 0.2 }}
              >
                Sign in
              </motion.button>

              <motion.p
                className="text-center text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                Don't have an account?{" "}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign up
                  </Link>
                </motion.span>
              </motion.p>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default LoginPage;
