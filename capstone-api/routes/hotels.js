const express = require('express')
const router = express.Router()
const { HotelsData, HotelsDetail, searchHotels, searchLocations } = require("../models/hotels")

//Hotel API
router.post('/hotels-location', (req, res) => { //works on insomnia
    const products = searchLocations(req.body);
    res.send(products);
});

router.post('/hotels-search', (req, res) => { //works on insomnia
    const products = searchHotels(req.body);
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
router.get('/hotels/:id', (req, res) => {
    // Logic to retrieve a specific hotel by ID
  });
  
  router.post('/hotels', (req, res) => {
    // Logic to create a new hotel
  });
  
  router.put('/hotels/:id', (req, res) => {
    // Logic to update an existing hotel by ID
  });
  
  router.delete('/hotels/:id', (req, res) => {
    // Logic to delete a hotel by ID
  });
  
  

module.exports = router;
