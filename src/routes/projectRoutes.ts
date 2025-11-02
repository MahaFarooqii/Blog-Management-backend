import express from "express";
import { authenticate } from "../middlewares/auth";
import { getProjects } from "../controllers/projects";

const router = express.Router();

router.get("/", authenticate, getProjects);

export default router;
