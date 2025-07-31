import Movie from "../models/Movies.js";

export const createmovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
