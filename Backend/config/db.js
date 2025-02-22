import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(`${process.env.ATLAS_DB_URL}`)
    .then(() => console.log("DB Connected"));
};
