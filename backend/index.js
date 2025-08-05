import express from "express";
import path from "path"
import cookieParser from "cookie-parser";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";
import UserRoutes from "./routes/UserRoutes.js";
import Genreroutes from "./routes/GenreRoutes.js";
import Moviesroutes from "./routes/Moviesroutes.js";
import uploadRoutes from "./routes/UploadRoutes.js"



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

ConnectDB();
const PORT = process.env.PORT || 3000;
app.use("/api/vi/users", UserRoutes);
app.use("/api/vi/genres", Genreroutes);
app.use("/api/vi/movies", Moviesroutes);
app.use("/api/vi/uploads", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
