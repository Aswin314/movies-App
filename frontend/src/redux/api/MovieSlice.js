import { apiSlice } from "./apiSlice";
import { MOVIES_URL, UPLOAD_URL } from "../constants";

export const MoviesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getallmovies: builder.query({
            query: () => `${MOVIES_URL}/allmovies`

        }),
        createnewmovie: builder.mutation({
            query: (newmovie) => ({
                url: `${MOVIES_URL}/createmovie`,
                method: "POST",
                body: newmovie
            })
        }),
        updatemovie: builder.mutation({
            query: ({ id, updatemovie }) => ({
                url: `${MOVIES_URL}/updatemovie/${id}`,
                method: "PUT",
                body: updatemovie
            })
        }),
        addmoviereview: builder.mutation({
            query: ({ id, rating, comment }) => ({
                url: `${MOVIES_URL}/${id}/reviews`,
                method: "POST",
                body: { rating, id, comment }

            })
        }),
        deletecomment: builder.mutation({
            query: ({ movieid, reviewid }) => ({
                url: `${MOVIES_URL}/deletecomment`,
                body: { movieid, reviewid }
            })
        }),
        deletemovie: builder.mutation({
            query: ({ id }) => ({
                url: `${MOVIES_URL}/deletemovie/${id}`,
                method: "DELETE"
            })
        }),
        specificmovie: builder.query({
            query: ({ id }) => `${MOVIES_URL}/specificmovie/${id}`
        })
    }),
    uploadimage: builder.mutation({
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
            url: `${MOVIES_URL}topmovie`
        })
    }),
    randomMovies: builder.query({
        query: () => `${MOVIES_URL}/randommovies`,
    }),
})

export const {
    useAllMoviesQuery,
    useCreateMovieMutation,
    useUpdateMovieMutation,
    useAddMovieReviewMutation,
    useDeleteCommentMutation,
    usetSpecificMovieQuery,
    useUploadImageMutation,
    useDeleteMovieMutation,
    //
    useNewMovieQuery,
    useTopMoviesQuery,
    useRandomMoviesQuery,
} = MoviesSlice;