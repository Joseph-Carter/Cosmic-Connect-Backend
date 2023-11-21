const db = require("../db/dbConfig.js");

const getAllPosts = async () => {
  try {
    const allPosts = await db.any("SELECT * FROM posts");
    console.log(allPosts);
    return allPosts;
  } catch (error) {
    console.error(error);
  }
};

const getOnePost = async (id) => {
  try {
    const onePost = await db.one("SELECT * FROM posts WHERE id=$1", id);
    return onePost;
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (post) => {
  try {
    const createdPost = await db.one(
      "INSERT INTO posts (title, description, image, tags, super_interest, interest_level, uploaded_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        post.title,
        post.description,
        post.image,
        post.tags,
        post.super_interest,
        post.interest_level,
        post.uploaded_at,
      ]
    );
    return createdPost;
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async (id, post) => {
  try {
    const {
      title,
      description,
      image,
      tags,
      super_interest,
      interest_level,
      uploaded_at,
    } = post;
    const updatedPost = await db.one(
      "UPDATE posts SET title=$1, description=$2, image=$3, tags=$4, super_interest=$5, interest_level=$6, uploaded_at=$7 WHERE id=$8 RETURNING *",
      [
        title,
        description,
        image,
        tags,
        super_interest,
        interest_level,
        uploaded_at,
        id,
      ]
    );
    return updatedPost;
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (id, userId) => {
  try {
    const post = await db.oneOrNone("SELECT * FROM posts WHERE id = $1", id);

    if (!post) {
      return "Post not found";
    }

    if (post.user_id === userId) {
      await db.none("DELETE FROM posts WHERE id = $1", id);
      return "Post deleted successfully";
    } else {
      return "Unauthorized to delete this post";
    }
  } catch (error) {
    console.error(error);
    return "Error deleting post";
  }
};

module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
};
