const express = require("express");
const router = express.Router();
const { userModel: User } = require("../models/userModel");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "test is successful",
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (err) return res.status(400).send(err);

    if (userInfo) {
      return res.json({
        success: false,
        message: "E-mail already exists!",
      });
    }

    const user = new User(req.body);

    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err });

      return res.status(200).json({
        success: true,
        userInfo,
      });
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).send(err);

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "No matched email found!",
      });
    }

    user.comparePassword(req.body.password, (err, isMatched) => {
      if (err) return res.status(400).send(err);

      if (!isMatched) {
        return res.json({
          loginSuccess: false,
          message: "Password is wrong!",
        });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
