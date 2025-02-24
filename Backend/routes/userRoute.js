import express from "express";
import passport from "../config/auth.js";
import { loginUser, signupUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Google OAuth login
userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
userRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect(`https://foodsrush.onrender.com?token=${req.user._id}`);
  }
);

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);

export default userRouter;
