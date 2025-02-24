import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";
import { storage } from "../config/cloud.js";

const foodRouter = express.Router();
const upload = multer({ storage });

// Add an Item
foodRouter.post("/add", upload.single("image"), addFood);

// Remove an Item
foodRouter.post("/remove", removeFood);

// Get all Items
foodRouter.get("/list", listFood);

export default foodRouter;
