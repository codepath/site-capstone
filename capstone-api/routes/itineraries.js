const express = require('express');
const router = express.Router();
const { } = require("../models/itineraries.js");

// Itinerary
router.get('/itineraries/:id', (req, res) => {
  // Logic to retrieve a specific itinerary by ID
});

router.post('/itineraries', (req, res) => {
  // Logic to create a new itinerary
});

router.put('/itineraries/:id', (req, res) => {
  // Logic to update an existing itinerary by ID
});

router.delete('/itineraries/:id', (req, res) => {
  // Logic to delete an itinerary by ID
});

// Itinerary Activities

router.get('/itineraries/:id/activities', (req, res) => {
  // Logic to retrieve activities for a specific itinerary
});

router.post('/itineraries/:id/activities', (req, res) => {
  // Logic to add an activity to a specific itinerary
});

router.put('/itineraries/:id/activities/:activityId', (req, res) => {
  // Logic to update an activity within a specific itinerary
});

router.delete('/itineraries/:id/activities/:activityId', (req, res) => {
  // Logic to delete an activity from a specific itinerary
});


module.exports = router;
