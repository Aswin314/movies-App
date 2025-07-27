import { apiSlice } from "./apiSlice";
import { GENRES_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createGenre: builder.mutation({
            query: (newgenre) => ({
                url: GENRES_URL,
                method: "POST",
                body: newgenre
            })
        }),
        updateGenre: builder.mutation({
            query: ({ id, updatedGenre }) => ({
                url: `${GENRES_URL}/${id}`,
                method: "PUT",
                body: updatedGenre
            })
        }),
        deleteGenre: builder.mutation({
            query: (id) => ({
                url: `${GENRES_URL}/${id}`,
                method: "DELETE"
            })
        }),
        Genrelist: builder.query({
            query: () => ({
                url: GENRES_URL,
                method: "GET"
            })
        }),

    })
})
export const { useCreateGenreMutation, useUpdateGenreMutation, useDeleteGenreMutation, useGenrelistQuery } = genreApiSlice;