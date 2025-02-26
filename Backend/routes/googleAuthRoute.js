import express from "express";
import { googleLogin } from "../controllers/googleAuthController.js";

const authRouter = express.Router();

authRouter.get("/google", googleLogin);

export default authRouter;
