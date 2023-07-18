const express = require('express')
const router = express.Router()
const { HotelsData, HotelsDetail, searchHotels, searchLocations } = require("../models/hotels")


router.get('/hotels-data', (req, res) => {
    const products = HotelsData();
    res.send(products);
});
  

router.get('/hotels-detail', (req, res) => {
    const products = HotelsDetail();
    res.send(products);
});
  
router.get('/hotels-location', (req, res) => {
    const products = searchLocations();
    res.send(products);
});

router.get('/hotels-search', (req, res) => {
    const products = searchHotels();
    res.send(products);
});
  

module.exports = router;
