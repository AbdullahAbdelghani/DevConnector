import { Request, Response } from "express";
import { User } from "../../models/User";
import jwt from "jsonwebtoken";
import { auth, CustomRequest } from "../../middleware/auth";
import { compare } from "bcryptjs";
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");

type LoginDataType = {
  email: string;
  password: string;
};

//@route   GET api/auth
//@desc    Gets user by user_id
//@acess   Private
router.get("/", auth, async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

//@route   POST api/auth
//@desc    authenticate user and get token
//@acess   Public
router.post(
  "/",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password }: LoginDataType = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid creadentials" }] });
      }

      const match = await compare(password, user.password);

      if (!match) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid creadentials" }] });
      }

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
