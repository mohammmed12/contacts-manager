const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult, check } = require("express-validator");
const config = require("config");
const auth = require("../middlewares/auth");

const router = express.Router();

// get/ api/auth -- get logged in user -- private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

// post/ api/auth -- login a user -- public
router.post(
  "/",
  [
    check("password", "plaese add a 6 chars password").isLength({ min: 6 }),
    check("email", "please add a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send("invalid credentials");
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("invalid credentials");
      }

      const payload = {
        user: {
          id: user._id,
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
