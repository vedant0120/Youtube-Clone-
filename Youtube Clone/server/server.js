const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config");
const port = config.PORT;
const mongodbURL = config.MONGODB_URL;
const path = require("path");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is successfully connected"))
  .catch((err) => console.log(err));

app.use("/uploads", express.static("uploads"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

// for heroku local
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});
//

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/videos", require("./routes/videoRoute"));
app.use("/api/subscriptions", require("./routes/subscriptionRoute"));
app.use("/api/like-dislike", require("./routes/likeDislikeRoute"));
app.use("/api/comment", require("./routes/commentRoute"));

app.listen(port, () => console.log(`The server is running on the ${port}`));
