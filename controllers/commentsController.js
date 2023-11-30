const express = require("express");
const {
  getAllComments,
  createOneComment,
  deleteComment,
} = require("../queries/comments");
const comments = express.Router({mergeParams: true});


comments.get("/:id", async (req, res) => {
    const { id } = req.params
  try {
    const allComments = await getAllComments(id);
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

comments.delete("/:id", async (req, res) => {
    try {
        const { userId, commentId } = req.params;
        const deletedComment = await deleteComment(userId, commentId, req.body);
        console.log("THIS IS DELETED COMMENT --->", deletedComment)
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