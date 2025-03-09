const express = require('express');
const User = require('../models/User');
const Trainer = require('../models/trainer');
const mongoose = require('mongoose');
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to handle user applying for subscription
router.post('/apply_subscription', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.body;

        // Step 1: Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Step 2: Ensure the user is not already a trainer
        if (user.role === 'trainer') {
            return res.status(400).json({ message: 'User is already a trainer' });
        }

        // Step 3: Fetch all trainers
        const trainers = await Trainer.find();

        // Step 4: Check if there are trainers available
        if (trainers.length === 0) {
            return res.status(400).json({ message: 'No trainers available' });
        }

        // Step 5: Randomly select a trainer
        const randomTrainer = trainers[Math.floor(Math.random() * trainers.length)];

        // Step 6: Update the user's trainer reference
        user.trainer = randomTrainer._id;
        await user.save();

        // Step 7: Send response
        res.status(200).json({
            message: 'Subscription applied successfully',
            trainer: randomTrainer, // Send the trainer details
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route to fetch all users assigned to a specific trainer
router.get('/users_under_trainer/:trainerId', authMiddleware, async (req, res) => {
    try {
        const { trainerId } = req.params;

        // Step 1: Check if the trainer exists
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) {
            return res.status(400).json({ message: 'Trainer not found' });
        }

        // Step 2: Find all users assigned to this trainer
        const users = await User.find({ trainer: trainerId }).populate('trainer', 'name'); // You can populate the trainer info if needed

        // Step 3: Check if there are users under this trainer
        if (users.length === 0) {
            return res.status(200).json({ message: 'No users found under this trainer' });
        }

        // Step 4: Send response with the list of users
        res.status(200).json({
            message: 'Users fetched successfully',
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
