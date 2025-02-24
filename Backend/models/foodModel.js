import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  category: {
    type: String,
    required: true,
  },
});

const foodModel = mongoose.model("Food", foodSchema);

export default foodModel;
