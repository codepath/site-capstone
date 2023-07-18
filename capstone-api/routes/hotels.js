const express = require('express')
const router = express.Router()
const { HotelsData, HotelsDetail, searchHotels, searchLocations } = require("../models/hotels")


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
  

module.exports = router;
