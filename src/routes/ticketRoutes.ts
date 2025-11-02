import express from "express";
import { authenticate } from "../middlewares/auth";
import { getTickets } from "../controllers/tickets";

const router = express.Router();

router.get("/", authenticate, getTickets);

export default router;
