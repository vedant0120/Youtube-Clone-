const express = require("express");
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { videoModel: Video } = require("../models/videoModel");
const {
  subscriptionModel: Subscription,
} = require("../models/subscriptionModel");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("Only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "test is successful",
  });
});

router.post("/file-upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

router.post("/upload", (req, res) => {
  const video = new Video(req.body);

  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/list", (req, res) => {
  let skip = req.body.skip;
  let limit = req.body.limit;
  let keyword = req.body.searchKeyword
    ? {
        title: {
          $regex: req.body.searchKeyword,
          $options: "i",
        },
      }
    : {};

  Video.find({ ...keyword })
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ videos });
    });
});

router.post("/single-video", (req, res) => {
  Video.findOneAndUpdate(
    { _id: req.body.id },
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ video });
    });
});

router.post("/subscription-videos", (req, res) => {
  Subscription.find({ userFrom: req.body.userFrom }).exec(
    (err, subscribers) => {
      if (err) return res.status(400).send(err);

      let subscribingUsers = [];

      subscribers.map((subscriber) => {
        subscribingUsers.push(subscriber.userTo);
      });

      Video.find({ writer: { $in: subscribingUsers } })
        .populate("writer")
        .exec((err, videos) => {
          if (err) return res.status(400).send(err);
          res.status(200).send(videos);
        });
    }
  );
});

module.exports = router;
