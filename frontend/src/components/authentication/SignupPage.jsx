import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "../Other/FormInput";
import { EmailIcon, LockIcon, UserIcon } from "../Other/Icons";
import { signUpUser } from "../../slices/UserSlice";
import Loader from "../loaders/Loader";

// SignupPage component handles user registration
function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);

  // State to store form validation errors
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to store form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update formData state when input fields change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    
    let errors = {};

    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setError(errors);

    // Stops the Func if there are validation errors
    if (Object.keys(errors).length > 0) return;
    
    try {
      // Send signup data to backend API through Redux action
      const res = await dispatch(signUpUser(formData));

      // If successful, it will update the currentUser state in UserSlice
      if(signUpUser.fulfilled.match(res)){
          console.log("Signup Success:", res.payload);
          // Redirect to login page after successful signup
          navigate("/login"); 
      }else{
          // signUpUser Promise Rejected
          alert(res.error?.message || "Signup failed");
      }
    } catch (err) {
      // Handle signup errors 
      console.error("Signup Failed:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signup failed");
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
          <Loader/>
        </motion.div>
      )}
    </AnimatePresence>
    <motion.div 
      className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-grow flex justify-center items-center p-4">
        <motion.div 
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Signup form header */}
          <motion.h2 
            className="text-3xl font-bold text-center mb-8 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create Account
          </motion.h2>
          {/* Signup form */}
          <motion.form 
            className="space-y-2" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* First and Last Name fields */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <FormInput
                type="text"
                name="firstName"
                placeholder="First Name"
                error={error.firstName}
                value={formData.firstName}
                onChange={handleChange}
                icon={<UserIcon />}
              />
              <FormInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                error={error.lastName}
                value={formData.lastName}
                onChange={handleChange}
                icon={<UserIcon />}
              />
            </motion.div>

            {/* Username field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <FormInput
                type="text"
                name="username"
                placeholder="Create Username"
                error={error.username}
                value={formData.username}
                onChange={handleChange}
                icon={<EmailIcon />}
              />
            </motion.div>

            {/* Email field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <FormInput
                type="email"
                name="email"
                placeholder="Enter Email"
                error={error.email}
                value={formData.email}
                onChange={handleChange}
                icon={<EmailIcon />}
              />
            </motion.div>

            {/* Password field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <FormInput
                type="password"
                name="password"
                placeholder="Create Password"
                error={error.password}
                value={formData.password}
                onChange={handleChange}
                showPasswordToggle={true}
                icon={<LockIcon />}
              />
            </motion.div>

            {/* Confirm Password field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                error={error.confirmPassword}
                value={formData.confirmPassword}
                onChange={handleChange}
                showPasswordToggle={true}
                icon={<LockIcon />}
              />
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
             Create Account
            </motion.button>

            {/* Link to login page */}
            <motion.p 
              className="text-center text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              Already have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in
                </Link>
              </motion.span>
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
    </>
  );
}

export default SignupPage;
