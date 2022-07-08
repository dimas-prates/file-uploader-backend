require("dotenv").config();
const express = require("express");
//log's lib
const morgan = require("morgan");
const mongoose = require("mongoose");
//importing static files to be access by /files route
const path = require("path");
const cors = require("cors");

const app = express();

// Database setup
// const url = "dockervm";
// const port = 27017;
// const dbname = "upload";
// mongoose.connect(`mongodb://${url}:${port}/${dbname}`, {
//   useNewUrlParser: true,
// });
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(require("./routes"));

app.listen(3000, () => {
  console.log("Server's running");
});
