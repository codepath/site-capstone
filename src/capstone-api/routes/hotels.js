const express = require('express')
const router = express.Router()
const { hotelsList } = require("../models/hotels")


router.get('/hotels', (req, res) => {
    console.log("entered this endpiont");
    const products = hotelsList();
    res.send(products);
});
  

module.exports = router;
