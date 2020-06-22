const mongoose = require("mongoose");

const config = require("config");

const db = config.get("MONGO_URL");

const connectDb = () => {
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("db connected"))
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};
module.exports = connectDb;
