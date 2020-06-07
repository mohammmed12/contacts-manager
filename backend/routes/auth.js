const express = require("express");

const router = express.Router();

// get/ api/auth -- get logged in uswr -- private
router.get("/", (req, res) => {
  res.send("get logged in user");
});

// post/ api/auth -- register a user -- public
router.post("/", (req, res) => {
  res.send("auth user and get token");
});

module.exports = router;
