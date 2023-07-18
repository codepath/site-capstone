const express = require('express');
const router = express.Router();
const { } = require("../models/activities.js");

// Activities
router.get('/activities/:id', (req, res) => {
  // Logic to retrieve a specific activity by ID
});

router.post('/activities', (req, res) => {
  // Logic to create a new activity
});

router.put('/activities/:id', (req, res) => {
  // Logic to update an existing activity by ID
});

router.delete('/activities/:id', (req, res) => {
  // Logic to delete an activity by ID
});



module.exports = router;
