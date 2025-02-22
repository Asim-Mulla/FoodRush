import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Logic
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Add an Item
foodRouter.post("/add", upload.single("image"), addFood);

// Remove an Item
foodRouter.post("/remove", removeFood);

// Get all Items
foodRouter.get("/list", listFood);

export default foodRouter;
