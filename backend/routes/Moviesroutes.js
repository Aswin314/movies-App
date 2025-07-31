import express from "express";
import { Authenticate, AuthorizeAdmin } from "../middlewares/authhandler.js";
import checkid from "../middlewares/checkid.js";
import { createmovie } from "../controllers/Moviecontroller.js";

const Moviesroutes = express.Router();

// Moviesroutes.get("/all-movies",getAllMovies);
Moviesroutes.post("/add-movie", Authenticate, AuthorizeAdmin,createmovie)
export default Moviesroutes;
