
import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        MaxLength: 32
    }
})
const Genre = mongoose.model("Genre", GenreSchema);
export default Genre;