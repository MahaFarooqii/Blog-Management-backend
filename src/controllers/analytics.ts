import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import Project from "../models/Project";
import Task from "../models/Task";
import Ticket from "../models/Ticket";
import User from "../models/User";

export const getAnalytics = async (req: AuthRequest, res: Response) => {
    try {
        const role = req.query.role as string;
        const userId = req.user!.id;

        const projectStatusAgg = [
            { $group: { _id: "$status", count: { $sum: 1 } } },
        ];

        const taskDistAgg = [
            { $group: { _id: "$status", count: { $sum: 1 } } },
        ];

        if (role === "admin") {
            const [projectStatus, taskDist, ticketsResolved, moderatorPerf] =
                await Promise.all([
                    Project.aggregate(projectStatusAgg),
                    Task.aggregate(taskDistAgg),
                    Ticket.aggregate([
                        {
                            $match: { status: "resolved" },
                        },
                        {
                            $group: {
                                _id: "$createdBy",
                                resolvedCount: { $sum: 1 },
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "_id",
                                foreignField: "_id",
                                as: "user",
                            },
                        },
                        {
                            $project: {
                                name: { $arrayElemAt: ["$user.name", 0] },
                                resolvedCount: 1,
                            },
                        },
                    ]),
                    Task.aggregate([
                        { $match: { status: "resolved" } },
                        {
                            $group: {
                                _id: "$project",
                                resolved: { $sum: 1 },
                            },
                        },
                        {
                            $lookup: {
                                from: "projects",
                                localField: "_id",
                                foreignField: "_id",
                                as: "project",
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "project.owner",
                                foreignField: "_id",
                                as: "moderator",
                            },
                        },
                        {
                            $project: {
                                name: { $arrayElemAt: ["$moderator.name", 0] },
                                resolved: 1,
                            },
                        },
                    ]),
                ]);

            return res.json({
                projectStatus,
                taskDist,
                ticketsResolved,
                moderatorPerf,
            });
        }

        if (role === "moderator") {
            const projects = await Project.find({ owner: userId }).select("_id");
            const projectIds = projects.map((p) => p._id);

            const [projectStatus, taskDist] = await Promise.all([
                Project.aggregate([
                    { $match: { _id: { $in: projectIds } } },
                    ...projectStatusAgg,
                ]),
                Task.aggregate([
                    { $match: { project: { $in: projectIds } } },
                    ...taskDistAgg,
                ]),
            ]);

            return res.json({ projectStatus, taskDist });
        }

        if (role === "user") {
            const ticketsResolved = await Ticket.aggregate([
                { $match: { createdBy: userId, status: "resolved" } },
                {
                    $group: {
                        _id: "$createdBy",
                        resolvedCount: { $sum: 1 },
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $project: {
                        name: { $arrayElemAt: ["$user.name", 0] },
                        resolvedCount: 1,
                    },
                },
            ]);

            return res.json({ ticketsResolved });
        }

        return res.status(400).json({ message: "Invalid role" });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
