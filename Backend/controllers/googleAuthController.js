import oauth2client from "../config/googleAuth.js";
import axios from "axios";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { name, email, picture } = userRes.data;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = new userModel({
        name,
        email,
        profileImage: picture,
      });

      await user.save();
    }

    const { _id } = user;
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Google login failed" });
  }
};

export { googleLogin };
