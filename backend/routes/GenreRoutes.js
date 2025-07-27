import express from "express";
import { Authenticate, AuthorizeAdmin } from "../middlewares/authhandler.js";
import { CreateGenre,updateGenre,deleteGenre,Genrelist,Onegenre } from "../controllers/GenreController.js";
const Genreroutes = express.Router();
Genreroutes.route("/").post(Authenticate, AuthorizeAdmin, CreateGenre)
Genreroutes.route("/:id").put(Authenticate, AuthorizeAdmin, updateGenre)
Genreroutes.route("/:id").delete(Authenticate, AuthorizeAdmin,deleteGenre)
Genreroutes.route("/genrelist").get(Genrelist)
Genreroutes.route("/:id").get(Onegenre)
export default Genreroutes;