import { Schema, model, Document, Types } from "mongoose";

export interface ITicket extends Document {
    task: Types.ObjectId;
    createdBy: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    status: "open" | "in-progress" | "resolved";
    notes?: string;
    createdAt: Date;
}

const TicketSchema = new Schema<ITicket>(
    {
        task: { type: Schema.Types.ObjectId, ref: "Task", required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
        status: {
            type: String,
            enum: ["open", "in-progress", "resolved"],
            default: "open",
        },
        notes: String,
    },
    { timestamps: true }
);

export default model<ITicket>("Ticket", TicketSchema);
