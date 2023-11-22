const express = require("express");
const cors = require("cors");
const app = express();
const usersContoller = require("./controllers/usersContoller");
const postsController = require("./controllers/postsController");
const commentContoller = require("./controllers/commentsController")

app.use(cors());
app.use(express.json());

app.use("/users/", usersContoller);
app.use("/users/:userId/posts", postsController);
app.use("/users/:userId/posts/:postId", commentContoller);

app.get("/", (req, res) => {
    res.send("Welcome to Cosmic Connect!");
  });
  
  app.get("*", (req, res) => {
    res.status(404).json({ success: false, data: { error: "Page not found! " } });
  });
  

module.exports = app;
