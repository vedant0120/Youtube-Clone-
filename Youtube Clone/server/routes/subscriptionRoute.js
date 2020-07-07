const express = require("express");
const router = express.Router();
const {
  subscriptionModel: Subscription,
} = require("../models/subscriptionModel");

router.post("/subscriber-number", (req, res) => {
  Subscription.find({ userTo: req.body.userTo }).exec((err, subscribers) => {
    if (err) res.status(400).send(err);
    res.status(200).send(subscribers);
  });
});

router.post("/subscription-status", (req, res) => {
  Subscription.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, status) => {
    if (err) res.status(400).send(err);
    res.status(200).send(status);
  });
});

router.post("/subscribe", (req, res) => {
  const subscribe = new Subscription(req.body);

  subscribe.save((err, doc) => {
    if (err) return res.send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/unsubscribe", (req, res) => {
  Subscription.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.send(err);
    return res.status(200).json({ success: true });
  });
});

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "subscription test is successful",
  });
});

module.exports = router;
