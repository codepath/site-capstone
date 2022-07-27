const express = require("express");
const Community = require("../models/community");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    let { id } = res.locals.user;
    const community = await Community.listCommunity(id);
    return res.status(201).json({ community: community });
  } catch (err) {
    next(err);
  }
});

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    console.log(res.locals);
    let { id } = res.locals.user;

    const community = req.body;
    const communities = await Community.PostCommunity(community, id);
    return res.status(201).json({ community: communities });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
