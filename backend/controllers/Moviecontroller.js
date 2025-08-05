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
            const alreadyReviewed = movie.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );
            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Movie already reviewed");
            }
            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment: String(comment),
                user: req.user._id
            }
            movie.reviews.push(review)
            movie.numberofreviews = movie.reviews.length
            movie.rating = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;
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
export const deletecomment = async (req, res) => {
    try {
        const { id, reviewId } = req.body;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const reviewIndex = movie.reviews.findIndex(
            (r) => r._id.toString() === reviewId
        );

        if (reviewIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        movie.reviews.splice(reviewIndex, 1);
        movie.numReviews = movie.reviews.length;
        movie.rating =
            movie.reviews.length > 0
                ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
                movie.reviews.length
                : 0;

        await movie.save();
        res.json({ message: "Comment Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });


    }
}
export const newmovies = async (req, res) => {
    try {
        const newmovies = await Movie.find().sort({ createdAt: -1 }).limit(10)
        res.json(newmovies)
    }
    catch (error) {
        res.status(404).json({ error: error.message })
    }
}
export const topmovies = async (req, res) => {
    try {
        const topmovies = await Movie.find().sort({ numberofreviews: -1 }).limit(10)
        res.json(topmovies)
    }
    catch (error) {
        res.status(404).json({ error: error.message })
    }
}
export const randommovies = async (req, res) => {
    try {
        const random = await Movie.aggregate([{ $sample: { size: 10 } }])
        res.json(random)
    }
    catch (error) {
        res.status(500).json("random not found", error)
    }
}