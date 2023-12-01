const db = require("../db/dbConfig.js");
const { getOneUser } = require("./users.js");

const getAllPosts = async () => {
  try {
    const allPosts = await db.any(
      "SELECT posts.id AS id, posts.title, posts.description, posts.image, posts.tags, posts.super_interest, posts.interest_level, posts.uploaded_at, posts.user_id, users.id AS user_id, users.first_name, users.last_name FROM posts JOIN users ON users.id = posts.user_id"
    );
    return allPosts;
  } catch (error) {
    console.error(error);
  }
};

const getOnePost = async (id) => {
  try {
    const onePost = await db.one("SELECT * FROM posts WHERE id=$1", id);
    if (onePost.id) {
      try {
        const { first_name, last_name } = (postAuthor = await getOneUser(
          onePost.user_id
        ));
        return { ...onePost, first_name, last_name };
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (post) => {
  try {
    const createdPost = await db.one(
      "INSERT INTO posts (title, description, image, tags, super_interest, interest_level, uploaded_at, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        post.title,
        post.description,
        post.image,
        post.tags,
        post.super_interest,
        post.interest_level,
        post.uploaded_at,
        post.user_id,
      ]
    );
    return createdPost;
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async (id, userId, post) => {
  try {
    const {
      title,
      description,
      image,
      tags,
      super_interest,
      interest_level,
      uploaded_at,
      user_id,
    } = post;

    if (parseInt(post.user_id) === parseInt(userId)) {
      const updatedPost = await db.one(
        "UPDATE posts SET title=$1, description=$2, image=$3, tags=$4, super_interest=$5, interest_level=$6, uploaded_at=$7, user_id=$8 WHERE id=$9 RETURNING *",
        [
          title,
          description,
          image,
          tags,
          super_interest,
          interest_level,
          uploaded_at,
          user_id,
          id,
        ]
      );
      return updatedPost;
    } else {
      return "Unauthorized to update this post";
    }
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
    if (parseInt(post.user_id) === parseInt(userId)) {
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
