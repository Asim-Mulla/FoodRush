import { log } from "console";
import foodModel from "../models/FoodModel.js";
import fs from "fs";

// Add Food Item
const addFood = async (req, res) => {
  const image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food item added to the DB" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured while adding the food item in the DB",
    });
  }
};

// Remove an Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item removed from the DB" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred while removing the item from Db",
    });
  }
};

// Get All Food Items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred while getting the foods",
    });
  }
};

export { addFood, listFood, removeFood };
