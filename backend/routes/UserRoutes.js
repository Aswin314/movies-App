import express from "express";
import {
  CreateUser,
  LoginUser,
  Logout,
  Getallusers,
  CurrentProfile,
  UpdateProfile
} from "../controllers/UserController.js";
import { Authenticate, AuthorizeAdmin } from "../middlewares/authhandler.js";
const UserRoutes = express.Router();

UserRoutes.route("/")
  .post(CreateUser)
  .get(Authenticate, AuthorizeAdmin, Getallusers);
UserRoutes.post("/Login", LoginUser);
UserRoutes.post("/Logout", Logout);
UserRoutes.route("/Profile").get(Authenticate, CurrentProfile).put(Authenticate,UpdateProfile)
export default UserRoutes;
