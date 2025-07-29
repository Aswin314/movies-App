import React from "react";
import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useGenrelistQuery,
} from "../../redux/api/GenreSlice";
import { toast } from "react-toastify";
import Genreform from "../../Components/Genreform";
import Modal from "../../Components/Modal";
const Genrelist = () => {
  const { data: genres, refresh } = useGenrelistQuery();
  const [name, setname] = useState("");
  const [selectedgenre, setSelectedGenre] = useState(null);
  const [updatedname, setUpdatedName] = useState("");
  const [modalvisible, setmodalvisible] = useState(false);
  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12">Manage Genres</h1>
        <Genreform
          value={name}
          setvalue={setvalue}
          handleSubmit={HandlecreateGenre}
        />
        <div className="flex flex-wrap">
          {genres?.map((genre) => (
            <div
              key={genre._id}
              className="bg-gray-100 p-3 m-2 rounded-lg shadow-md w-[20rem]"
            >
              <h2 className="text-lg font-semibold">{genre.name}</h2>
              <button
                onClick={() => {
                  setSelectedGenre(genre);
                  setUpdatedName(genre.name);
                  setmodalvisible(true);
                }}
                className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalvisible} onclose={() => setmodalvisible(false)}>
          <Genreform
            value={updatedname}
            setvalue={(value) => setUpdatedName(value)}
            habndleSubmit={handleUpdateGenre}
            buttonText="Update Genre"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Genrelist;
