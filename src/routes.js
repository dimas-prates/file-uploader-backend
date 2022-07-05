const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/Post");

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  //return res.json({ hello: "world" });
  const { originalname: name, size, key, location: url = "" } = req.file;
  // const post = await Post.create({
  //   name: req.file.originalname,
  //   size: req.file.size,
  //   key: req.file.filename,
  //   url: "",
  // });
  const post = await Post.create({
    name,
    size,
    key,
    url,
  });
  return res.json(post);
});

routes.get("/posts", async (req, res) => {
  const post = await Post.find();
  return res.json(post);
});

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  await post.remove();
  return res.send();
});
module.exports = routes;
