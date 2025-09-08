import "../config/env.js";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";

// // JWT SECRET SETUP
// if (!process.env.JWT_SECRET) {
//   throw new Error("JWT_SECRET environment variable is required but not set.");
// }
const jwtSecret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // check for existing user
    const existingUser = await UserModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`⚠️ Email already in use: ${normalizedEmail}`);
      }

      return res.status(400).json({
        success: false,
        message: "Email is already registered. Please use a different one.",
      });
    }

    // create new user
    const user = await UserModel.create({
      name,
      email: normalizedEmail,
      password,
    });

    if (!user) {
      if (process.env.NODE_ENV !== "production") {
        console.error("❌ Failed to save user to database.");
      }

      return res.status(500).json({
        success: false,
        message: "Unable to create account. Please try again later.",
      });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`✅ User created: ${name} (${normalizedEmail})`);
    }

    return res.status(201).json({
      success: true,
      message: `Account created successfully 🎉 Welcome, ${name}!`,
    });
  } catch (err) {
    console.error("🔥 Error during registration :", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      ...(process.env.NODE_ENV !== "production" && { error: err.message }),
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email & password are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    if (process.env.NODE_ENV !== "production") {
      console.log(`🔐 Login attempt for: ${normalizedEmail}`);
    }

    // check if the user exist
    const user = await UserModel.findOne({ email: normalizedEmail });
    if (!user) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`⚠️ Login failed: user not found (${normalizedEmail})`);
      }
      return res.status(404).json({
        success: false,
        message:
          "User not found. Please check your email or register for a new account.",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `⚠️ Login failed: invalid password for ${normalizedEmail}`
        );
      }
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please try again.",
      });
    }

    // JWT TOKEN CREATION
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
      expiresIn: "2h",
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`✅ User logged in successfully: ${normalizedEmail}`);
    }

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 2,
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        token,
      });
  } catch (err) {
    console.error("🔥 Login Error :", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      ...(process.env.NODE_ENV !== "production" && { error: err.message }),
    });
  }
};

export { registerUser, loginUser };
