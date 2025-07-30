import jwt from "jsonwebtoken";
import { User } from "../models/userModel.mjs";
import { secretMessage } from "../../config.mjs";
import { isValidEmail, isValidStrongPassword } from "../utils/validators.mjs";

// Generate JWT token for authenticated user
const generateToken = (userId) =>
  jwt.sign({ id: userId }, secretMessage, {
    expiresIn: "7d",
  });

// --------------------------------------------------------------------
// Controller: Register new user
const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    req.body;

  try {
    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }

    // Validate strong password
    if (!isValidStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 9 characters and include uppercase, lowercase, number, and special character",
      });
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      if (existingUsername.isDeleted) {
        return res.status(403).json({
          message:
            "This username was used for a deleted account. Please choose a different one.",
        });
      }
      return res.status(400).json({ message: "Username already taken" });
    }

    // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      if (existingEmail.isDeleted) {
        return res.status(403).json({
          message:
            "This email was previously used for a deleted account. Please use a different email.",
        });
      }
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    // Respond with user info and token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// --------------------------------------------------------------------
// Controller: Login existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      console.log("authControll: email reqquired");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      console.log("authControll: Invalid email");
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Find user by email
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if account is locked
    if (user.isLocked()) {
      const remaining = Math.ceil((user.lockUntil - new Date()) / (1000 * 60)); // minutes left
      return res.status(403).json({
        message: `Account is locked due to multiple failed login attempts. Try again in ${remaining} minutes.`,
      });
    }

    // Match password with stored hash
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      user.loginAttempts += 1;

      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // lock for 24 hrs
        await user.save();
        return res.status(403).json({
          message:
            "Account locked due to too many failed login attempts. Try again after 24 hours.",
        });
      }

      await user.save();
      return res.status(401).json({ message: "Invalid email or password" });
    }

    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLogin = new Date();

    if (!user.isActive) {
      user.isActive = true;
    }

    await user.save();

    // Response with user info and token
    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export { registerUser, loginUser };
