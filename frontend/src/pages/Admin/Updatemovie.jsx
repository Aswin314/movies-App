import React from 'react'
import { useState, useEffect } from 'react'
import { Form, useNavigate, useParams } from 'react-router'
import {
    useUpdateMovieMutation,
    useUploadImageMutation,
    useDeleteMovieMutation,
    useGetSpecificMovieQuery
} from '../../redux/api/MovieSlice'
import { toast } from 'react-toastify'

const Updatemovie = () => {
    const { id } = useParams()
    const Navigate = useNavigate()
    const [movieData, setMovieData] = useState({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        rating: 0,
        image: null,
        genre: "",
    });
    const [selectedimage, setselectedimage] = useState(null)
    const { data: initialmoviedata } = useGetSpecificMovieQuery(id)
    useEffect(() => {
        if (initialmoviedata) {
            setMovieData(initialmoviedata)
        }
    }, [initialmoviedata])
    const [updatemovie, { isloading: isupdatingmovie }] = useUpdateMovieMutation()
    const [uploadimage, { isloading: isuploadingimage, error: isuploadimageerror }] = useUploadImageMutation()
    const [deletemovie] = useDeleteMovieMutation()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleimageChange = (e) => {
        const file = e.target.files[0];
        setselectedimage(file);
    };
    const handleUpdateMovie = async () => {
        try {
            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.cast
            ) {
                toast.error("Please fill in all required fields");
                return;
            }
            let uploadedimagepath = movieData.image
            if (selectedimage) {
                const formdata = new FormData()
                formdata.append("image", selectedimage)
                const uploadImageResponse = await uploadimage(formdata)
                if (uploadImageResponse.data) {
                    uploadedimagepath = uploadImageResponse.data.image
                } else {
                    console.error("Failed to upload image:", isuploadimageerror);
                    toast.error("Failed to upload image");
                    return;
                }
            }
            await updatemovie({
                id: id,
                updatedMovie: {
                    ...movieData,
                    image: uploadedimagepath,
                },
            });
            console.log(movieData);

            toast.success("movie updated")
            // Navigate("/movies")
        }
        catch (error) {
            console.log("Error");

        }

    }
    const handleDeleteMovie = async () => {
        try {
            toast.success("Delete succeed")
            await deletemovie(id)
            Navigate("/movies")
        }
        catch (error) {
            console.log("Error");
            toast.error("Delete error ")

        }
    }
    return (
        <div className='container flex justify-center items-center mt-4'>
            <form>
                <p className='text-green-200 w-[50rem] text-2xl mb-4'>update movie</p>
                <div className="mb-4">
                    <label className="block">
                        Name:
                        <input type="text"
                            name='name'
                            value={movieData.name}
                            onChange={handleChange}
                            className='border px-4 py-2 w-full  ' />

                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Year:
                        <input type="number"
                            name='year'
                            value={movieData.year}
                            onChange={handleChange}
                            className='border px-4 py-2 w-full  ' />

                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Detail:
                        <textarea type="text"
                            name='detail'
                            value={movieData.detail}
                            onChange={handleChange}
                            className='border px-4 py-2 w-full ' />

                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Cast(coma-separated):
                        <input type="text" value={movieData.cast.join(", ")} onChange={(e) => ({ ...movieData, cast: e.target.value.split(",") })}
                            className="border px-2 py-1 w-full" />

                    </label>
                </div>
                <div className="mb-4">
                    <label
                        style={
                            !selectedimage
                                ? {
                                    border: "1px solid #888",
                                    borderRadius: "5px",
                                    padding: "8px",
                                    cursor: 'pointer'
                                }
                                : {
                                    border: "0",
                                    borderRadius: "0",
                                    padding: "0",
                                }
                        }
                    >
                        {!selectedimage && "Upload Image"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleimageChange}

                            style={{ display: !selectedimage ? "none" : "block", }}
                        />
                    </label>
                </div>
                <button
                    type="button"
                    onClick={handleUpdateMovie}
                    className="bg-teal-600 text-white px-4 py-2 rounded cursor-pointer"
                    disabled={isupdatingmovie || isuploadingimage}
                >
                    {isupdatingmovie || isuploadingimage ? "Updating..." : "Update Movie"}
                </button>
                <button
                    type="button"
                    onClick={handleDeleteMovie}
                    className="bg-red-600 text-white px-4 py-2 rounded m-3 cursor-pointer"
                    disabled={isupdatingmovie || isuploadingimage}
                >
                    {isupdatingmovie || isuploadingimage ? "Deleting..." : "Delete Movie"}
                </button>
            </form>
        </div>
    )
}

export default Updatemovie
