import User from "../models/USer.js";
import jwt from "jsonwebtoken";
import asyncmiddleware from "./AsyncMiddleware.js";

const Authenticate = asyncmiddleware(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const Decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(Decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401);
    throw new Error("Not Authenticate");
  }
});
const AuthorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("This is not admin");
  }
};
export { Authenticate, AuthorizeAdmin };
