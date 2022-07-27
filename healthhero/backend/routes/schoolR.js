const express = require("express");
const School = require("../models/school");
const security = require("../middleware/security");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const school = await School.listSchools();
        return res.status(201).json({ school: school});
      } catch (err) {
        next(err);
      }
});

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const school = req.body;
      const schools = await School.postSchools(school);
      return res.status(201).json({ school: schools });
    } catch (err) {
      next(err);
    }
  })

  module.exports = router