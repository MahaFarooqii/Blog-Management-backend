import express from "express";
import cors from "cors";
import { json } from "body-parser";
import authRoutes from './routes/authRoutes'
import postRoutes from './routes/postRoutes'
const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

export default app;
