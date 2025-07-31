import Movie from "../models/Movies.js";

export const createmovie = async (req, res) => {
    try {
        const { name, image, year, genre, detail, cast } = req.body;
        const movie = new Movie({
            name,
            image,
            year,
            genre,
            detail,
            cast
        });
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
