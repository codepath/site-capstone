const express = require('express');
const router = express.Router();
const { getFlights } = require("../models/flights");


// Get Flights for a destination 
router.get('/flights', async (req, res) => {
    const credentials = req.body;
    try {
        const flights = await getFlights(credentials);
        if (!flights) {
          res.status(404).json({ error: 'Flight not found.' });
        } else {
          res.json(flights);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve flights.' });
      }
  
});

// router.post('/favorites', (req, res) => {
//   // Logic to add a favorite for a specific user
// });

// router.put('/favorites/:id', (req, res) => {
//   // Logic to update an existing favorite by ID
// });

// router.delete('/favorites/:id', (req, res) => {
//   // Logic to delete a favorite by ID
// });



module.exports = router;
