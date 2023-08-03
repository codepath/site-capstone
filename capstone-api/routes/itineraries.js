// const express = require('express');
// const router = express.Router();
// const { } = require("../models/itineraries.js");

// // Itinerary
// router.get('/itineraries/:id', async (req, res) => {
//   try {
//     const itineraryId = req.params.id;
//     const itinerary = await Itinerary.fetchIteneraryById(itineraryId);
//     if (!itinerary) {
//       return res.status(404).json({ error: "Itinerary not found." });
//     }
//     res.json(itinerary);
//   } catch (err) {
//     console.error("Error fetching itinerary:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post('/itineraries', (req, res) => {
//   // Logic to create a new itinerary
// });

// router.put('/itineraries/:id', (req, res) => {
//   // Logic to update an existing itinerary by ID
// });

// router.delete('/itineraries/:id', (req, res) => {
//   // Logic to delete an itinerary by ID
// });

// // Itinerary Activities

// router.get('/itineraries/:id/activities', (req, res) => {
//   // Logic to retrieve activities for a specific itinerary
// });

// router.post('/itineraries/:id/activities', (req, res) => {
//   // Logic to add an activity to a specific itinerary
// });

// router.put('/itineraries/:id/activities/:activityId', (req, res) => {
//   // Logic to update an activity within a specific itinerary
// });

// router.delete('/itineraries/:id/activities/:activityId', (req, res) => {
//   // Logic to delete an activity from a specific itinerary
// });


// module.exports = router;
