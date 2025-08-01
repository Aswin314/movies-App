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
export const getmovie = async (req, res) => {
    try {
        const Movies = await Movie.find({})
        res.status(200).json(Movies);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updatemovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Movie ID is required" });
        }
        const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        await movie.save();
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deletemovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Movie ID is required" });
        }
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const onemovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Movie ID is required" });
        }
        const movie = await Movie.findById(id)
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const moviereview = async (req, res) => {
    try {
        const { rating, comment } = req.body
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            const Reviewedmovie = movie.reviews.find((r) => r.user.toString() === req.user._id.toString())
            if (Reviewedmovie) {
                res.status(404)
                throw new Error("movie already exist")
            }
            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            movie.reviews.push(review)
            movie.numberofreviews = movie.reviews.length
            movie.rating = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length
            await movie.save()
            res.status(201).json("review added")

        }
        else {
            res.status(404)
            throw new Error("movie not found ")
        }

    }
    catch (error) {
        console.error();
        res.status(400).json(error.message)

    }
}