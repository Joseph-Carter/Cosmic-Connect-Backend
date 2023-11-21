const express = require("express");
const {
  getAllComments,
  createOneComment,
  deleteComment,
} = require("../queries/comments");
const comments = express.Router();

comments.get("/", async (req, res) => {
  try {
    const allComments = await getAllComments();
    res.status(200).json(allComments);
  } catch (error) {
    res.status(500).json({ success: false, data: { error: "Server Error" } });
  }
});

comments.post("/", async (req, res) => {
    try {
        const createdComment = await createOneComment(req.body);
        res.status(200).json(createdComment)
    } catch (error) {
        res.status(500).json({ success: false, data: { error: "Server Error" } });
    }
});

comments.delete("/id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await deleteComment(id, re.body);
        if (deletedComment.id) {
            res.status(200).json(deletedComment)
        } else {
            res.status(500).json({ success: false, data: { error: "Server Error" } });
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = comments