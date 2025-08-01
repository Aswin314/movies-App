import express from "express";
import { Authenticate, AuthorizeAdmin } from "../middlewares/authhandler.js";
import checkid from "../middlewares/checkid.js";
import { createmovie, getmovie, updatemovie, deletemovie, onemovie,moviereview } from "../controllers/Moviecontroller.js";

const Moviesroutes = express.Router();

// Protected routes
Moviesroutes.post("/addmovie", Authenticate, AuthorizeAdmin, createmovie)
Moviesroutes.put("/updatemovie/:id", Authenticate, AuthorizeAdmin, updatemovie)
Moviesroutes.delete("/deletemovie/:id", Authenticate, AuthorizeAdmin, deletemovie)
Moviesroutes.get("/onemovie/:id", Authenticate, AuthorizeAdmin, onemovie)
//public route
Moviesroutes.post("/allmovie", Authenticate, AuthorizeAdmin, getmovie)
Moviesroutes.post("/:id/moviereview", Authenticate, AuthorizeAdmin, moviereview)
export default Moviesroutes;
