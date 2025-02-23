import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login User
const loginUser = async (req, res) => {
  console.log("inside backend's controller login function");
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);

  try {
    console.log("finding user");

    const user = await userModel.findOne({ email });
    console.log("user", user);

    if (!user) {
      console.log("user not found");

      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = createToken(user._id);
    console.log("token ", token);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

// Signup User
const signupUser = async (req, res) => {
  console.log("inside backend's controller signup function");

  const { name, email, password } = req.body;
  console.log("name", name);
  console.log("email", email);
  console.log("password", password);

  try {
    console.log("trying to find the existing user ");

    // Checking if the user is already registered
    const exists = await userModel.findOne({ email });
    if (exists) {
      console.log("User already exists");

      return res.json({ success: false, message: "User already exists" });
    }

    // Validating email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // checking if the password is strong enough
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (min 8 digits).",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(7);
    const hashedPsaaword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPsaaword,
    });

    console.log("user ", user);

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong while signing up",
    });
  }
};

export { loginUser, signupUser };
