import { Request, Response } from "express";
import { url } from "gravatar";
import { hash, genSalt } from "bcryptjs";
import jwt from "jsonwebtoken";
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");

import { User } from "../../models/User";
//@route   POST api/users
//@desc    register user
//@acess   Public
type LoginData = {
  name: string;
  email: string;
  password: string;
};
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password }: LoginData = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }

      const avatar = url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await genSalt(10);
      user.password = await hash(password, salt);

      await user.save();

      const payload = {
        id: user.id,
      };
      const jwtSecret: jwt.Secret = config.get("jwtsecret");
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.send({ token });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
