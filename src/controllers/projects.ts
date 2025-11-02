import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import Project from "../models/Project";

export const getProjects = async (req: AuthRequest, res: Response) => {
    try {
        const role = req.user!.role;
        const userId = req.user!.id;

        let query = {};

        if (role === "admin") {
            query = {};
        } else if (role === "moderator") {
            query = { owner: userId };
        } else if (role === "user") {
            query = { members: userId };
        }

        const projects = await Project.find(query)
            .populate("owner", "name email role")
            .populate("members", "name email role")
            .sort({ createdAt: -1 });

        res.json(projects);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
