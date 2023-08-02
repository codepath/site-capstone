const express = require('express');
const router = express.Router();
const Activities = require("../models/activities.js");

// Activities
router.get('/activities/:id', async (req, res) => {
  try {
    const activityId = req.params.id;
    const activity = await Activities.getActivityById(activityId);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found." });
    }
    res.json(activity);
  } catch (err) {
    console.error("Error fetching activity:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const { name, price, city, check_in, check_out } = req.body;
    // create a new activity
    const newActivity = await Activities.addActivity({
      name,
      price,
      city,
      check_in,
      check_out,
    });
    res.status(201).json(newActivity);
  } catch (err) {
    console.error("Error creating activity:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/activities/:id', async (req, res) => {
  try {
    const activityId = req.params.id;
    const { name, price, city, check_in, check_out } = req.body;
    // update the activity
    const updatedActivity = await Activities.updateActivity(activityId, {
      name,
      price,
      city,
      check_in,
      check_out,
    });
    if (!updatedActivity) {
      return res.status(404).json({ error: "Activity not found." });
    }
    res.json(updatedActivity);
  } catch (err) {
    console.error("Error updating activity:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/activities/:id', async (req, res) => {
  try {
    const activityId = req.params.id;
    //delete the activity
    const deletedActivity = await Activities.deleteActivity(activityId);
    if (!deletedActivity) {
      return res.status(404).json({ error: "Activity not found." });
    }
    res.json(deletedActivity);
  } catch (err) {
    console.error("Error deleting activity:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
