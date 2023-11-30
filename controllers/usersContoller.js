const express = require("express");
const users = express.Router();
const bcrypt = require("bcryptjs");
const { validateRegisterInput } = require("../validation/usersValidation");
const {
  getOneUserByEmail,
  createUser,
  getOneUser,
} = require("../queries/users");
const posts = require("../controllers/postsController")
const comments = require("../controllers/commentsController")

users.use("/users/:userId/posts", posts)
users.use("/:userId/posts/:id/", comments)

users.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const oneUser = await getOneUser(userId);
  // console.log("THIS IS ONEUSER FROM CONTROLLER --->", oneUser)
  if (oneUser) {
    res.json(oneUser);
  } else {
    res.status(404).json({ error: "User Not Found" });
  }
});

users.post("/signup", validateRegisterInput, async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await createUser({
      ...userData,
      password: hashedPassword,
    });
    res.json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Error Creating User" });
  }
});

users.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getOneUserByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json({ message: "Login successful", user });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = users;
