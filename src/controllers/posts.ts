import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import Post from "../models/Post";
import mongoose from "mongoose";

export const getPosts = async (req: AuthRequest, res: Response) => {
    try {
        let query = {};
        const posts = await Post.find(query)
            .populate("authorId")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
export const getUserPosts = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.params.id;

        const posts = await Post.find({
            $or: [
                { authorId: new mongoose.Types.ObjectId(userId) },
                { authorId: userId }
            ],
        })
            .populate("authorId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "User posts fetched successfully",
            posts,
        });
    } catch (err: any) {
        console.error("Error fetching user posts:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

export const publishPosts = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newPost = new Post({
            title,
            content,
            authorId: user?.id,
            createdAt: new Date(),
        });

        await newPost.save();

        const populatedPost = await newPost.populate("authorId");

        res.status(201).json({
            message: "Post published successfully",
            post: populatedPost,
        });
    } catch (err: any) {
        console.error("Error publishing post:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
export const updatePost = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const postId = req.params.id;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const postData = req.body;

        const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
            new: true,
        });

        if (!updatedPost) {
            return res.status(500).json({ message: "Post not found" });
        }

        const populatedPost = await updatedPost.populate("authorId");

        res.status(200).json({
            message: "Post updated successfully",
            post: populatedPost,
        });
    } catch (err: any) {
        console.error("Error updating post:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
export const deletePost = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const postId = req.params.id;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const deletedPost = await Post.findByIdAndDelete(postId);

        res.status(200).json({
            message: "Post updated successfully",
            post: deletedPost,
        });
    } catch (err: any) {
        console.error("Error updating post:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};