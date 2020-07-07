const express = require("express");
const router = express.Router();
const { commentModel: Comment } = require("../models/commentModel");

router.post("/save-comment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(comment);
  });
});

router.post("/list-comments", (req, res) => {
  Comment.find(req.body)
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(comments);
    });
});

module.exports = router;
