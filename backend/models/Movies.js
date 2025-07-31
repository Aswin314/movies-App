import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
    },
    genre: {
        type: ObjectId,
        ref: "Genre",
    },

    timestamps: true,
});
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
