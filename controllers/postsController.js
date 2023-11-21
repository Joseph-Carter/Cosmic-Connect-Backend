const express = require("express");
const posts = express.Router();
const {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
} = require("../queries/posts");

posts.get("/id", async (req, res) => {
  const { id } = req.params;
  const onePost = await getOnePost(id);
  if (onePost) {
    res.status(200).json(onePost);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

posts.get("/", async (req, res) => {
  try {
    const allPosts = await getAllPosts();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ success: false, data: { error: "Server Error!" } });
  }
});

posts.post("/register", async (req, res) => {
  try {
    const createdPost = await createPost(req.body);
    res.json(createdPost);
  } catch (error) {}
});

posts.delete("/id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await deletePost(id);
    if (deletedPost) {
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json("Post Not Found");
    }
  } catch (error) {
    console.log(error);
  }
});

posts.put("/id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await updatePost(id, req.body);
    if (updatedPost.id) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json("Post with that id does not exist");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = posts;
