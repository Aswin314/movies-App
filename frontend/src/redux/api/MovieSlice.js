import { apiSlice } from "./apiSlice";
import { MOVIES_URL, UPLOAD_URL } from "../constants";

export const MoviesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allMovies: builder.query({
            query: () => `${MOVIES_URL}/adminmovielist`

        }),
        createMovie: builder.mutation({
            query: (newmovie) => ({
                url: `${MOVIES_URL}/addmovie`,
                method: "POST",
                body: newmovie
            })
        }),
        updateMovie: builder.mutation({
            query: ({ id, updatemovie }) => ({
                url: `${MOVIES_URL}/updatemovie/${id}`,
                method: "PUT",
                body: updatemovie
            })
        }),
        addmovieReview: builder.mutation({
            query: ({ id, rating, comment }) => ({
                url: `${MOVIES_URL}/${id}/reviews`,
                method: "POST",
                body: { rating, id, comment }

            })
        }),
        deleteComment: builder.mutation({
            query: ({ movieid, reviewid }) => ({
                url: `${MOVIES_URL}/deletecomment`,
                body: { movieid, reviewid }
            })
        }),
        deleteMovie: builder.mutation({
            query: ( id ) => ({
                url: `${MOVIES_URL}/deletemovie/${id}`,
                method: "DELETE"
            })
        }),
       getSpecificMovie: builder.query({
            query: (id) => `${MOVIES_URL}/onemovie/${id}`
        }),
        uploadImage: builder.mutation({
            query: (formdata) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: formdata
            })
        }),
        newmovie: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/newmovie`
            })
        }),
        topmovie: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/topmovie`
            })
        }),
        randomMovies: builder.query({
            query: () => `${MOVIES_URL}/randommovies`,
        }),
    })

})

export const {
    useAllMoviesQuery,
    useCreateMovieMutation,
    useUpdateMovieMutation,
    useAddMovieReviewMutation,
    useDeleteCommentMutation,
    useGetSpecificMovieQuery,
    useUploadImageMutation,
    useDeleteMovieMutation,
    //
    useNewMovieQuery,
    useTopMoviesQuery,
    useRandomMoviesQuery,
} = MoviesSlice;