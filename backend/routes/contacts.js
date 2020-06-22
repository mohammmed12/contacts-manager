const express = require("express");
const Contact = require("../models/Contact");
const User = require("../models/User");
const { validationResult, check } = require("express-validator");
const config = require("config");
const auth = require("../middlewares/auth");
const router = express.Router();

// get/ api/contacts -- get all contacts -- public
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

// post/ api/contacts -- create anew contact -- public
router.post(
  "/",
  [auth, check("name", "please name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        user: req.user.id,
        name,
        phone,
        type,
        email,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.log(error);
      return res.status(500).send("server error");
    }
  }
);

// update contact
router.put("/:id", (req, res) => {
  res.send("update a contact");
});

// post/ api/users -- register a user -- public
router.delete("/:id", (req, res) => {
  res.send("you just hit the delete route to delete a specific contact");
  000;
});

module.exports = router;
