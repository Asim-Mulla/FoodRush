import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
