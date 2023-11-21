const express = require("express");
const posts = express.Router();
const {getAllPosts,
    getOnePost,
    createPost,
    updatePost,
    deletePost } = require("../queries/posts");

    posts.get("/id", async (req, res) => {
        const { id } = req.params
        const onePost = await getOnePost(id)
        if (onePost) {
            res.status(200).json(onePost)
        } else {
            res.status(404).json({ error: "Not Found" });
        }
    });

    posts.get("/", async (req, res) => {
        try {
            const allPosts = await getAllPosts()
            res.status(200).json(allPosts)
        } catch (error) {
            res.status(500).json({ success: false, data: { error: "Server Error!" } })
        }
    });

    posts.post("/register", async (req, res) => {
        try {
            const createdPost = await createPost(req.body);
            res.json(createdPost);
            
        } catch (error) {
            
        }
    })

module.exports = posts