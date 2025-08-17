import { createSlice } from "@reduxjs/toolkit";

const MoviesSlice = createSlice({
    name: "movies",
    initialState: {
        moviesFilter: {
            searchTerm: "",
            selectedGenre: "",
            selectedYear: "",
            selectedSort: [],
        },
        filteredMovies: [],
        moviesYear: [],
        uniqueYear: [],
    },
    reducers: {
        setMoviesFilter: (state, action) => {
            state.moviesFilter = { ...state.moviesFilter, ...action.payload }
        },
        setFilteredMovies: (state, action) => {
            state.filteredMovies = action.payload
        },
        setMoviesYear: (state, action) => {
            state.moviesYear = action.payload
        },
        setUniqueYear: (state, action) => {
            state.uniqueYear = action.payload
        }

    }
})

export const { setMoviesFilter,
    setFilteredMovies,
    setMoviesYear,
    setUniqueYear } = MoviesSlice.actions
export default MoviesSlice.reducer