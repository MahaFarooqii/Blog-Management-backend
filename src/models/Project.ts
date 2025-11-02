import { Schema, model, Document, Types } from "mongoose";

export interface IProject extends Document {
    title: string;
    description?: string;
    owner: Types.ObjectId; // moderator
    members: Types.ObjectId[]; // users
    status: "active" | "completed";
    createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["active", "completed"], default: "active" },
}, { timestamps: true });

export default model<IProject>("Project", ProjectSchema);
