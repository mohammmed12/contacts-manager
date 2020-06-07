const express = require("express");

const router = express.Router();

// post/ api/users -- register a user -- public
router.post("/", (req, res) => {
  res.send("register a user");
});

module.exports = router;
