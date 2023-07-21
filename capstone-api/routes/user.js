const express = require('express');
const router = express.Router();
const pool = require('../db');
const { User, printTableColumns } = require("../models/user.js");
// import User from "../models/user.js"

// Users
router.get('/users', async (req, res) => {
  // Logic to retrieve all users
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
});

router.get('/users/:id', async (req, res) => {
  // Logic to retrieve a specific user by ID
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

router.post('/login', (req, res) => {
  // Logic for user login
});

router.post('/register', (req, res) => {
  // Logic for user registration
});

router.put('/users/:id', async (req, res) => {
  // Logic to update an existing user by ID
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

router.delete('/users/:id', async (req, res) => {
  // Logic to delete a user by ID
  const { id } = req.params;
  try {
    await User.deleteUser(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

router.get('/tableinfo', async (req, res) => {
  try {
    //const query = 'SELECT * FROM hotels'
    const query = 'SELECT current_database();'
    pool.query(query)
    .then((result) => {
        console.log(result)
        console.log('worked')
    })
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to print table information." });
  }
});


module.exports = router;
