const mongoose = require("mongoose");
const dotenv = require("dotenv");

const URL = process.env.MONGO_URL;
const connect = async () => {
  console.log("Connecting to db....");
  try {
    mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful");
  } catch (err) {
    console.log(`Couldn't connect to db ${err}`);
  }
};

exports.connect = connect;
