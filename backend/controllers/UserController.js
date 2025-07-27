import bcrypt from "bcryptjs";
import GenerateToken from "../utils/CreateToken.js";
import asyncmiddleware from "../middlewares/AsyncMiddleware.js";
import User from "../models/USer.js";

const CreateUser = asyncmiddleware(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  // Hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    GenerateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const LoginUser = asyncmiddleware(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      GenerateToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
});
const Logout = asyncmiddleware(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(201).json({ message: "Logout" });
});
const Getallusers = asyncmiddleware(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
const CurrentProfile = asyncmiddleware(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
});
const UpdateProfile = asyncmiddleware(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    const updateuser = await user.save();
    res.status(201).json({
      _id: updateuser._id,
      username: updateuser.username,
      email: updateuser.email,
      isAdmin: updateuser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  CreateUser,
  LoginUser,
  Logout,
  Getallusers,
  CurrentProfile,
  UpdateProfile,
};
