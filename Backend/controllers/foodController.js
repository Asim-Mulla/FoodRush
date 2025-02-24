import foodModel from "../models/foodModel.js";
import { cloudinary } from "../config/cloud.js";

// Add Food Item
const addFood = async (req, res) => {
  const url = req.file.path;
  const filename = req.file.filename;

  if (!url || !filename) {
    res.json({ success: true, messsage: "Image not found." });
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: { url, filename },
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

    // deleting the image from cloud
    const productImgPubId = food.image.filename;

    if (productImgPubId) {
      try {
        cloudinary.uploader.destroy(productImgPubId);
      } catch (error) {
        console.log(error);
        console.log("Cannot delete image from cloud.");
      }
    }

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
