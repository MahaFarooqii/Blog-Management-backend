import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
    title: string;
    description?: string;
    project: Types.ObjectId;
    assignee?: Types.ObjectId; // user
    priority?: "low" | "medium" | "high";
    status: "open" | "in-progress" | "resolved";
    resolutions: { by: Types.ObjectId; note: string; at: Date; verified?: boolean }[];
    createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: String,
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" },
    resolutions: [{
        by: { type: Schema.Types.ObjectId, ref: "User" },
        note: String,
        at: { type: Date, default: Date.now },
        verified: { type: Boolean, default: false }
    }]
}, { timestamps: true });

export default model<ITask>("Task", TaskSchema);
