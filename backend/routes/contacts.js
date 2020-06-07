const express = require("express");

const router = express.Router();

// get/ api/contacts -- get all contacts -- public
router.get("/", (req, res) => {
  res.send("get all contacts");
});

// post/ api/contacts -- get all contacts -- public
router.post("/", (req, res) => {
  res.send("add a new contact");
});

// upfdate contact
router.put("/:id", (req, res) => {
  res.send("update a contact");
});

// post/ api/users -- register a user -- public
router.delete("/:id", (req, res) => {
  res.send(
    "you just hit tjhe route that deletes a contact actualluy a specific contact"
  );
});

module.exports = router;
