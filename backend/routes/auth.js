const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Trainer = require("../models/trainer");
const { generateToken } = require("../config/jwt");
const router = express.Router();

// Register User as Customer or Trainer
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, mobile, role, expertise, experience, availability } = req.body;

        // Check if the user already exists by email
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Create User Document
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({ username, email, password: hashedPassword, mobile, role });  // Ensure role is passed
        await user.save();

        // If the user is a trainer, create the Trainer document
        if (role === "trainer") {
            const trainer = new Trainer({
                user: user._id
            });
            await trainer.save();
        }

        // Generate token for the user
        const token = generateToken(user._id);
        res.status(201).json({ message: "User registered successfully", token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);
        res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
