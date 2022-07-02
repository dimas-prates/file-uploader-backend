const express = require("express");
//log's lib
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Database setup
const url = "localhost";
const port = 27017;
const dbname = "upload";
mongoose.connect(`mongodb://${url}:${port}/${dbname}`, {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(require("./routes"));

app.listen(3000, () => {
  console.log("Server's running");
});
