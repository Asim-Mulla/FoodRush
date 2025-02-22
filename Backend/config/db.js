import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://AsimMulla:ejf64f8wj29fuw8eo3cjid@cluster0.kkh7x.mongodb.net/FoodRush"
    )
    .then(() => console.log("DB Connected"));
};
