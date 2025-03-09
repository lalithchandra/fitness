const mongoose = require("mongoose");
const { Schema } = mongoose;

// Trainer Schema
const TrainerSchema = new Schema({
    trainerId: {
        type: String,
        unique: true,
        required: true,
        default: () => `trainer-${Math.floor(Math.random() * 100000)}`, // Generates a unique trainer ID
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Reference to the User model
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Trainer", TrainerSchema);
