import express from "express";
import { getUsers, login, register } from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers)

export default router;
