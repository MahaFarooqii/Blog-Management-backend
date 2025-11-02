import express from "express";
import { getAnalytics } from "../controllers/analytics";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/overview", authenticate, getAnalytics);

export default router;
