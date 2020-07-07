const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  //   JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  //   PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
};
