const express = require('express');
const router = express.Router();
const { User } = require("../models/user.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); // Add this line


// Users

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found." });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user." });
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    await User.updateUser(id, updates);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user." });
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.deleteUser(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

// Add hotel with activities to favorites
router.post('/users/:id/favorites', async (req, res) => {
  try {
    const userId = req.params.id;
    const { hotelData, activities, flightData } = req.body;

    const credentials = {userId, hotelData, activities, flightData};

    console.log(req.body.hotelData, " ", userId);

    // Call the addHotelWithActivitiesToFavorites function in the User model
    const result = await User.addHotelWithActivitiesToFavorites(credentials);

    res.status(201).json({
      message: "Hotel and activities added successfully to favorites",
      result,
    });
  } catch (err) {
    console.error("Error adding hotel with activities to favorites:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add hotel with activities to itineraries
router.post('/users/:id/itineraries', async (req, res) => {
  try {
    const userId = req.params.id;
    const { hotelData, activities, flightData } = req.body;

    const credentials = {userId, hotelData, activities, flightData};

    // Call the addHotelWithActivitiesToItinerary function in the User model
    const result = await User.addHotelWithActivitiesToItinerary(credentials);

    res.status(201).json({
      message: "Hotel and activities added successfully to itineraries",
      result,
    });
  } catch (err) {
    console.error("Error adding hotel with activities to itineraries:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a user's favorite by favorite ID
router.delete('/users/:id/favorites/:favoriteId', async (req, res) => {

  try {
    const userId = req.params.id;
    const favoriteId = req.params.favoriteId;
    await User.deleteUserFavorite(userId, favoriteId);
    res.json({ message: "Favorite deleted successfully" });
  } catch (err) {
    console.error("Error deleting favorite:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a user's itinerary by itinerary ID
router.delete('/users/:id/itineraries/:itineraryId', async (req, res) => {
  try {
    const userId = req.params.id;
    const itineraryId = req.params.itineraryId;
    await User.deleteUserItinerary(userId, itineraryId);
    res.json({ message: "Itinerary deleted successfully" });
  } catch (err) {
    console.error("Error deleting itinerary:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get user itineraries

router.get('/users/:id/itineraries', async (req, res) => {
  try {
    const userId = req.params.id;
    const itineraries = await User.getUserItineraries(userId);
    res.json(itineraries);
  } catch (err) {
    console.error("Error retrieving user itineraries:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user favorites

router.get('/users/:id/favorites', async (req, res) => {
  try {
    const userId = req.params.id;
    const favorites = await User.getUserFavorites(userId);
    res.json(favorites);
  } catch (err) {
    console.error("Error retrieving user favorites:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password, phone_number } = req.body;
  
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Save the user to the database
    const newUser = await User.registerUser(name, email, hashedPassword, phone_number);
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user." });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    // Check if password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid password." });
    }

    // If both email and password are correct, send a successful response
    res.json({ message: "Login successful.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login." });
  }
});




module.exports = router;

