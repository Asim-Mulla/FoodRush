import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  showAllUsersOrders,
  showOrders,
  updateStatus,
  verifyPayment,
} from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware, verifyPayment);
orderRouter.post("/orders", authMiddleware, showOrders);
orderRouter.get("/all", showAllUsersOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
