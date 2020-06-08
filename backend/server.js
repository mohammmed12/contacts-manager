const express = require("express");
const connectDb = require("./config/db");
const app = express();

connectDb();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "welcome to the contact keeper api",
  });
});

// define routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// connect database

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server started on the port"));
