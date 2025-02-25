import express from "express";
import { googleLogin } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/google", googleLogin);

export default authRouter;
