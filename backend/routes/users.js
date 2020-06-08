const express = require("express");
const User = require("../models/User");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

// post/ api/users -- register a user -- public
router.post(
  "/",
  [
    check("name", "please add a valid name").not().isEmpty(),
    check("password", "plaese add a 6 chars password").isLength({ min: 6 }),
    check("email", "please add a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "user already exists" });
    }
    try {
      const newUser = new User({ email, name, password });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      const payload = {
        user: {
          id: newUser._id,
        },
      };

      jwt.sign(
        payload,
        config.get("JWT_SECRET"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send("server error");
    }
  }
);

module.exports = router;
