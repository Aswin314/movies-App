import express from "express";
import { Authenticate, AuthorizeAdmin } from "../middlewares/authhandler.js";
import { CreateGenre,updateGenre } from "../controllers/GenreController.js";
const Genreroutes = express.Router();
Genreroutes.route("/").post(Authenticate, AuthorizeAdmin, CreateGenre)
Genreroutes.route("/:id").put(Authenticate, AuthorizeAdmin, updateGenre)
export default Genreroutes;