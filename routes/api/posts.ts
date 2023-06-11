import { User } from "../../models/User";
import { Post, PostType, CommentType } from "../../models/Post";
import { validationResult, check } from "express-validator";
import { auth, CustomRequest } from "../../middleware/auth";
import { Request, Response } from "express";
const express = require("express");
const router = express.Router();

//@route   Post api/posts
//@desc    Create a post
// //@acess   Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).send("User not found");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      } as PostType);
      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//@route   GET api/posts
//@desc    Get all posts
//@acess   Private

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route   GET api/posts/:id
//@desc    Get post by id
//@acess   Private

router.get("/:id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route   DELETE api/posts/:id
//@desc    DELETE a post by id
//@acess   Private

router.delete("/:id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    //check on the user
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "user not authorized" });
    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route   PUT api/posts/like/:id
//@desc    like a post
//@acess   Private

router.put("/like/:id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    //check if the user already liked this post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route   PUT api/posts/unlike/:id
//@desc    unlike a post
//@acess   Private

router.put("/unlike/:id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    //check if the user already liked this post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route   Post api/posts/comment/:id
//@desc    add comment
//@acess   Private

router.put(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ msg: "User not found" });
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ msg: "Post not found" });
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      } as CommentType;

      post.comments.unshift(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

//@route   Post api/posts/comment/:id/:comment_id
//@desc    delete comment
//@acess   Private

router.delete(
  "/comment/:id/:comment_id",
  auth,
  async (req: CustomRequest, res: Response) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ msg: "Post not found" });
      //pull out comment
      const comment = post.comments.find(
        //@ts-expect-error
        (comment) => comment.id === req.params.comment_id
      );

      if (!comment || comment === undefined)
        return res.status(404).json({ msg: "Comment not found" });

      if (comment.user.toString() !== req.user.id)
        res.status(401).json({ msg: "User not authorized" });

      const removeIndex = post.comments
        .map((comment) => comment.user.toString())
        .indexOf(req.user.id);
      post.comments.splice(removeIndex, 1);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
