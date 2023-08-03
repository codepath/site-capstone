const express = require('express')
const router = express.Router()
const { HotelsData, HotelsDetail, searchHotels, searchLocations } = require("../models/hotels")

//Hotel API
router.post('/hotels-location', async (req, res) => { //works on insomnia
    const destId = await searchLocations(req.body);
    //const destId = products[0].dest_id;
    res.send(destId);
});

router.post('/hotels-search', async (req, res) => { //works on insomnia
    const products = await searchHotels(req.body);
    res.send(products);
});

router.post('/hotels-data', (req, res) => {//works on insomnia 
    const products = HotelsData(req.body);
    res.send(products);
});
  

router.post('/hotels-detail', (req, res) => { //works on insomnia 
    const products = HotelsDetail(req.body);
    res.send(products);
});


// Hotel Schema
  router.get('/hotels/:id', async (req, res) => {
    // Logic to retrieve a specific hotel by ID
    const { id } = req.params;

    try {
      const hotel = await Hotels.getHotelById(id);
      if (!hotel) {
        res.status(404).json({ error: 'Hotel not found.' });
      } else {
        res.json(hotel);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve hotel.' });
    }

  });
  
  router.post('/hotels', async (req, res) => {
    // Logic to create a new hotel
    const credentials = req.body;

    try {
      await Hotels.addHotel(credentials);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create hotel.' });
    }
    
  });
  
  router.put('/hotels/:id', async (req, res) => {
    // Logic to update an existing hotel by ID
    const { id } = req.params;
  const updates = req.body;

  try {
    await Hotels.updateHotel(id, updates);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update hotel.' });
  }
  });
  
  router.delete('/hotels/:id', async (req, res) => {
    // Logic to delete a hotel by ID
    const { id } = req.params;
  
    try {
      const deletedHotel = await Hotels.deleteHotel(id);
      if (!deletedHotel) {
        res.status(404).json({ error: 'Hotel not found.' });
      } else {
        res.json({ message: 'Hotel deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete hotel.' });
    }
  });
  
  

module.exports = router;
