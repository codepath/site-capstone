const express = require('express')
const router = express.Router()
const { HotelsData, HotelsDetail } = require("../models/hotels")


router.get('/hotels-data', (req, res) => {
    const products = HotelsData();
    res.send(products);
});
  

router.get('/hotels-detail', (req, res) => {
    const products = HotelsDetail();
    res.send(products);
});
  

module.exports = router;
