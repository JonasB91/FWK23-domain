const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { authenticateToken } = require("../utils/authMiddleware");

// Skapa nytt inlägg
router.post("/posts", authenticateToken, postController.createPost);

// Hämta alla inlägg
router.get("/posts", authenticateToken, postController.getPosts);

// Uppdatera ett specifikt inlägg
router.put("/posts/:id", authenticateToken, postController.updatePost);

// Radera ett specifikt inlägg
router.delete("/posts/:id", authenticateToken, postController.deletePost);

module.exports = router;
