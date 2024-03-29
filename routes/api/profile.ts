import { Request, Response } from "express";
import { auth, CustomRequest } from "../../middleware/auth";
import {
  Profile,
  ProfileType,
  EducationType,
  ExperienceType,
  SocialType,
} from "../../models/Profile";
import { User } from "../../models/User";
import { validationResult, check } from "express-validator";
import request from "request";

const express = require("express");
const config = require("config");
const router = express.Router();

//@route   GET api/profile/me
//@desc    get current users profile
//@acess   private
router.get("/me", auth, async (req: CustomRequest, res: Response) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route   POST api/profile
//@desc    create or update user profile
//@acess   private

router.post(
  "/",
  [
    auth,
    [
      check("status", "status are required").not().isEmpty(),
      check("skills", "skills are required").not().isEmpty(),
    ],
  ],
  async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { skills }: { skills: string } = req.body;
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
    }: ProfileType = req.body;
    const { facebook, youtube, twitter, instagram, linkedin }: SocialType =
      req.body;
    const profilefields = new Profile();
    profilefields.user = req.user.id;
    if (company) profilefields.company = company;
    if (website) profilefields.website = website;
    if (location) profilefields.location = location;
    if (bio) profilefields.bio = bio;
    if (status) profilefields.status = status;
    if (githubusername) profilefields.githubusername = githubusername;
    if (skills) {
      profilefields.skills = skills.split(",").map((skills) => skills.trim());
    }
    if (facebook) profilefields.social.facebook = facebook;
    if (youtube) profilefields.social.youtube = youtube;
    if (twitter) profilefields.social.twitter = twitter;
    if (instagram) profilefields.social.instagram = instagram;
    if (linkedin) profilefields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // update
        profilefields._id = profile._id;
        profilefields.education = profile.education;
        profilefields.experience = profile.experience;
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true }
        );

        return res.json(profile);
      }

      // create
      profile = new Profile(profilefields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

//@route   GET api/profile
//@desc    get all profiles
//@acess   public

router.get("/", async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route   GET api/profile/user/:user_id
//@desc    get a profile by user id
//@acess   public

router.get("/user/:user_id", async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    });

    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route   DELETE api/profile
//@desc    delete profile, user & post
//@acess   private
router.delete("/", auth, async (req: CustomRequest, res: Response) => {
  try {
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route   PUT api/profile/experience
//@desc    add profile experience
//@acess   private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req: CustomRequest, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    }: ExperienceType = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(404).json({ msg: "Profile not found" });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//@route   DELETE api/profile/experience/:exp_id
//@desc    delete experience from profile
//@acess   private

router.delete(
  "/experience/:exp_id",
  auth,
  async (req: CustomRequest, res: Response) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(404).json({ msg: "Profile not found" });
      //get the remove index
      const removeIndex = profile.experience
        // @ts-expect-error
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//@route   PUT api/profile/education
//@desc    add profile education
//@acess   private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req: CustomRequest, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    }: EducationType = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(404).json({ msg: "Profile not found" });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//@route   DELETE api/profile/education/:edu_id
//@desc    delete education from profile
//@acess   private

router.delete(
  "/education/:edu_id",
  auth,
  async (req: CustomRequest, res: Response) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(404).json({ msg: "Profile not found" });
      //get the remove index
      const removeIndex = profile.education
        // @ts-expect-error
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//@route   GET api/profile/github/:username
//@desc    get your repos from Github
//@acess   public

router.get("/github/:username", (req: Request, res: Response) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body: string) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "Profile not found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
