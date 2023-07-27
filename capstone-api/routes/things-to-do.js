const express = require('express')
const router = express.Router()
const { searchPlaces, placesDetail, placesPhotos } = require("../models/things-to-do")

//Places API
router.post('/places-search', async (req, res) => {
    try {
        const products = await searchPlaces(req.body);
        if (products) {
            // Convert nested objects into plain JavaScript objects
            const results = products.data.results.map(place => {
                return {
                    ...place,
                    location: { ...place.location }, // Convert location to a plain object
                    related_places: { ...place.related_places }, // Convert related_places to a plain object
                    photos: [...place.photos], // Convert photos array to a new array
                    categories: [...place.categories] // Convert categories array to a new array
                };
            });
            console.log(results);

            res.json({ results });
        } else {
            res.status(404).json({ error: "No results found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/places-detail', async (req, res) => {
    try {
      const placeDetail = await placesDetail(req.body);
      if (placeDetail) {
        // Convert nested objects into plain JavaScript objects
        const result = {
          ...placeDetail.data,
          location: { ...placeDetail.data.location }, // Convert location to a plain object
          related_places: { ...placeDetail.data.related_places }, // Convert related_places to a plain object
          photos: [...placeDetail.data.photos], // Convert photos array to a new array
          categories: [...placeDetail.data.categories] // Convert categories array to a new array
        };
        console.log(result);

        res.json(result);

      } else {
        res.status(404).json({ error: "Place detail not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post('/places-photos', async (req, res) => {
    try {
      const photos = await ThingsToDo.placesPhotos(req.body);
      if (photos) {
        // Convert nested objects into plain JavaScript objects
        const results = photos.data.results.map(photo => {
          return {
            ...photo,
            classificaitons: [...photo.classificaitons] // Convert classifications array to a new array
          };
        });
  
        // Print JSON data to the terminal
        console.log(results);
  
        res.json({ results });
      } else {
        res.status(404).json({ error: "Photos not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
