import Task from "../models/Task";
import { AuthRequest } from "../middlewares/auth";
import { Response } from "express";

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        let filter = {};
        if (!user) {
            return;
        }
        if (user?.role === "admin" || user?.role === "moderator") {
            filter = {};
        } else {
            filter = { assignee: user?.id };
        }

        const tasks = await Task.find(filter)
            .populate("project", "title")
            .populate("assignee", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ message: "Error fetching tasks", error: err });
    }
};
export const addTask = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const { title, description, project, assignee, priority, status } = req.body;

        if (!title || !priority || !status) {
            return res.status(400).json({ message: "Title, priority, and status are required." });
        }

        const newTask = new Task({
            title,
            description,
            project,
            assignee,
            priority,
            status,
            createdBy: user.id,
        });

        const savedTask = await newTask.save();

        const populatedTask = await Task.findById(savedTask._id)
            .populate("project", "title")
            .populate("assignee", "name email");

        res.status(201).json(populatedTask);
    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).json({ message: "Error adding task", error: err });
    }
};
export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const { id } = req.params;
        const { title, description, project, assignee, priority, status } = req.body;

        const existingTask = await Task.findById(id);
        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (title !== undefined) existingTask.title = title;
        if (description !== undefined) existingTask.description = description;
        if (project !== undefined) existingTask.project = project;
        if (assignee !== undefined) existingTask.assignee = assignee;
        if (priority !== undefined) existingTask.priority = priority;
        if (status !== undefined) existingTask.status = status;

        const updatedTask = await existingTask.save();

        const populatedTask = await Task.findById(updatedTask._id)
            .populate("project", "title")
            .populate("assignee", "name email");

        res.status(200).json(populatedTask);
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ message: "Error updating task", error: err });
    }
};
