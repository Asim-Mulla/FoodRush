import orderRouter from "./routes/orderRoute.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import { connectDB } from "./config/db.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/googleAuthRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
