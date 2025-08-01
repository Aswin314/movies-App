import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/AsyncMiddleware.js";
const CreateGenre = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name);

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const genreExists = await Genre.findOne({ name });
        if (genreExists) {
            return res.status(400).json({ message: "Genre already exists" });
        }
        const genre = new Genre({ name }).save();
        res.json(genre)

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
})
const updateGenre = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const genre = await Genre.findById({ _id: id });
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        genre.name = name || genre.name;
        const updatedGenre = await genre.save();
        res.json(updatedGenre);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
})
const deleteGenre = asyncHandler(async (req, res) => {
    const { id } = req.params
    const Removed = await Genre.findByIdAndDelete(id)
    res.json("item Removed", Removed)
})
const Genrelist = asyncHandler(async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.json(genres);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});
const Onegenre = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const genre = await Genre.findById(id);
    if (!genre) {
        return res.status(404).json({ message: "Genre not found" });
    }
    res.json(genre);
});
export { CreateGenre, updateGenre, deleteGenre, Genrelist, Onegenre };