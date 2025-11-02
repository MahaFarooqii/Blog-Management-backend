import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import Ticket from "../models/Ticket";

export const getTickets = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const role = req.user!.role;

        let tickets;

        if (role === "admin") {
            tickets = await Ticket.find()
                .populate("task", "title")
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email");
        } else if (role === "moderator") {
            tickets = await Ticket.find({ assignedTo: userId })
                .populate("task", "title")
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email");
        } else {
            tickets = await Ticket.find({ createdBy: userId })
                .populate("task", "title")
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email");
        }

        res.json(tickets);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
