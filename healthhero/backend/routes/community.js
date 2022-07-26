const express = require("express");
const Community = require("../models/community");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

router.get(
  "/communities",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      let { id } = res.locals.user;
      const community = await Community.listRests(id);
      return res.status(201).json({ community: community });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/communities",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      let { id } = res.locals.user;

      const community = req.body;
      const communities = await Community.PostRests(community, id);
      return res.status(201).json({ community: communities });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
