const cors = require("cors");
const express = require("express");
const app = express();
const initRoutes = require("./routes");
const mongoose = require("mongoose");

var corsOptions = {
  origin: true,
};

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const db = require("./config/db");

mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch((err) => console.error("Connection error", err));

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
