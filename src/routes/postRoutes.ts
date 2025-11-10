import express from "express";
import { authenticate } from "../middlewares/auth";
import { deletePost, getPosts, getUserPosts, publishPosts, updatePost } from "../controllers/posts";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getUserPosts);
router.post("/", authenticate, publishPosts);
router.patch("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);
export default router;
