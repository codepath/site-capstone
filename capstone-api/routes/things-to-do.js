const express = require('express')
const router = express.Router()
const { searchPlaces } = require("../models/things-to-do")

//Places API
router.post('/places-search', async (req, res) => { 
    try {
        const products = await searchPlaces(req.body);
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); 
    }
});

module.exports = router;
