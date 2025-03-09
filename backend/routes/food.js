const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// Create food entry
router.post('/add', async (req, res) => {
  try {
    const { name, calories } = req.body;
    const newFood = new Food({ name, calories });
    const savedFood = await newFood.save();
    res.json(savedFood);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Get all food entries
router.get('/all', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedFood = await Food.findByIdAndDelete(req.params.id);
      if (!deletedFood) {
        return res.status(404).json({ message: 'Food entry not found' });
      }
      res.json({ message: 'Food entry deleted successfully', deletedFood });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
