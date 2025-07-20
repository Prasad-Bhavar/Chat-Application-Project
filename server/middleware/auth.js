import jwt from "jsonwebtoken";
import User from "../models/user";

//middleware to protect route
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.header.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password"); // it will remove the password from the data;
    if (!user) {
      return res.json({ succes: false, message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ succes: false, message: "user not found" });
  }
};
