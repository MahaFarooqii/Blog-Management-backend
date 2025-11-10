import { Schema, model, Document, Types } from "mongoose";

export interface IPost extends Document {
    title: string;
    content: string;
    authorId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default model<IPost>("Post", PostSchema);
