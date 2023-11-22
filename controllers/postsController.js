const express = require("express");
const posts = express.Router({ mergeParams: true });
const {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
} = require("../queries/posts");
const comments = require("../controllers/commentsController")

posts.use("posts/:postId/comments", comments)

posts.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const onePost = await getOnePost(postId);
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

posts.post("/", async (req, res) => {
  try {
    const userId = req.params.userId;
    const postWithUserId = { ...req.body, user_id: userId };

    const createdPost = await createPost(postWithUserId);
    res.json(createdPost);
  } catch (error) {
    res.status(500).json({ success: false, data: { error: "Server Error!" } });
  }
});

posts.delete("/:postId", async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const deletedPost = await deletePost(postId, userId);
    if (deletedPost) {
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json("Post Not Found");
    }
  } catch (error) {
    console.log(error);
  }
});

posts.put("/:postId", async (req, res) => {
  try {
    const { postId, userId } = req.params;
  
    const updatedPost = await updatePost(postId, userId, req.body);
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
