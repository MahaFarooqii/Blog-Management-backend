import { Schema, model, Document } from "mongoose";

export type Role = "admin" | "moderator" | "user";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "moderator", "user"], default: "user" },
}, { timestamps: true });

export default model<IUser>("User", UserSchema);
