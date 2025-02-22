import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "You are not logged in." });
  }

  try {
    const verified_token = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = verified_token.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "" });
  }
};

export default authMiddleware;
