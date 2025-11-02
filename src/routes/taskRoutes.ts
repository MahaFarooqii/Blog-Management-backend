import express from "express";
import { authenticate } from "../middlewares/auth";
import { addTask, getTasks, updateTask } from "../controllers/tasks";

const router = express.Router();

router.get("/", authenticate, getTasks);
router.post("/", authenticate, addTask);
router.patch("/:id", authenticate, updateTask);
export default router;
