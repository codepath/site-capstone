const express = require('express')
const router = express.Router()
const {  } = require("../models/user.js")

//Itinerary
router.get('/get-itinerary/:id', (req, res) => { 
  
});

router.post('/add-itinerary', (req, res) => { 
   
});

router.put('/change-itinerary/:id', (req, res) => { 
    
});

router.delete('/delete-itinerary/:id', (req, res) => { 
   
});

//Itinerary Activities
router.get('/get-itinerary-activities/:id', (req, res) => { 
  
});

router.post('/add-itinerary-activites', (req, res) => { 
   
});

router.put('/change-itinerary-activites/:id', (req, res) => { 
    
});

router.delete('/delete-itinerary-activites/:id', (req, res) => { 
   
});

//Activities
router.get('/get-activites/:id', (req, res) => { 
  
});

router.post('/add-activites', (req, res) => { 
   
});

router.put('/change-activites/:id', (req, res) => { 
    
});

router.delete('/delete-activites/:id', (req, res) => { 
   
});

//Favorites
router.get('/get-favorites/:id', (req, res) => { 
   
});

router.post('/add-favorites', (req, res) => { 
    
});

router.put('/change-favorites/:id', (req, res) => { 
    
});

router.delete('/delete-favorites/:id', (req, res) => { 
    
});


//Hotels
router.get('/get-hotels/:id', (req, res) => { 
    
});

router.post('/add-hotels', (req, res) => { 
    
});

router.put('/change-hotels/:id', (req, res) => { 
   
});

router.delete('/delete-hotels/:id', (req, res) => { 
   
});

//Users
router.get('/users', (req, res) => { 
    
});

router.get('/users/:id', (req, res) => { 
    
});

router.post('/login', (req, res) => { 
    
});

router.post('/register', (req, res) => { 
    
});

router.post('/users', (req, res) => { 
    
});

router.put('/users/:id', (req, res) => { 
   
});

router.delete('/users/:id', (req, res) => { 
   
});





module.exports = router;
