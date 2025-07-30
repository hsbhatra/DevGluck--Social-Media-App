import jwt from "jsonwebtoken";
import { User } from "../models/userModel.mjs";
import { secretMessage } from "../../config.mjs";

// Middleware to protect routes:
// Checks if the user is authenticated by verifying the JWT token
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Expect header: Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    // Verify and decode JWT
    const decoded = jwt.verify(token, secretMessage);

    // Find the user from DB and attach to the request object (req.user) so we can use it later.
    req.user = await User.findById(decoded.id).select("-password");
    // console.log("Authenticated user:", req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid" });
  }
};
