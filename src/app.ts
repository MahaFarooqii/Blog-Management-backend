import express from "express";
import cors from "cors";
import { json } from "body-parser";
import authRoutes from './routes/authRoutes'
import analyticsRoutes from './routes/analyticsRoutes'
import projectRoutes from './routes/projectRoutes'
import ticketRoutes from './routes/ticketRoutes'
import taskRoutes from './routes/taskRoutes'
const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/analytics", analyticsRoutes);

export default app;
