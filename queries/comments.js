const db = require("../db/dbConfig");

const getAllComments = async (id) => {
  try {
    const allComments = await db.any(
      "SELECT * FROM comments WHERE post_id = $1",
      id
    );
    return allComments;
  } catch (error) {
    console.log(error);
  }
};

const createOneComment = async (reply) => {
  const { comment, commented_at, post_id, user_id } = reply;

  try {
    const createdComment = await db.one(
      "INSERT INTO comments (comment, commented_a, post_id, user_id) VALUES ($1, $2 , $3, $4) RETURNING *",
      [comment, commented_at, post_id, user_id]
    );
    return createdComment;
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (id, userId, postId) => {
  try {
    const comment = await db.oneOrNone(
      "SELECT * FROM comments WHERE id = $1",
      id
    );

    if (!comment) {
      return "Comment not found";
    }

    if (comment.user_id === userId || comment.post_id === postId) {
      await db.none("DELETE FROM comments WHERE id = $1", id);
      return "Comment deleted successfully";
    } else {
      return "Unauthorized to delete this comment";
    }
  } catch (error) {
    console.error(error);
    return "Error deleting comment";
  }
};

module.exports = {
  getAllComments,
  createOneComment,
  deleteComment,
};
