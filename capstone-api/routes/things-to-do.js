const express = require('express')
const router = express.Router()
const { searchPlaces, placesDetail, placesPhotos } = require("../models/things-to-do")

//Places API
router.post('/places-search', async (req, res) => {  //works on insomnia 
    try {
        const products = await searchPlaces(req.body);
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); 
    }
});

router.post('/places-detail', async (req, res) => { //works on insomnia 
    try {
        const products = await placesDetail(req.body);
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); 
    }
});

router.post('/places-photos', async (req, res) => { //works on insomnia 
    try {
        const products = await placesPhotos(req.body);
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); 
    }
});

module.exports = router;
