import React from "react";
import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/GenreSlice";
import { toast } from "react-toastify";
import Genreform from "../../Components/Genreform";
import Modal from "../../Components/Modal";
const Genrelist = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();
  const handleCreateGenre = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a genre name");
      return;
    }
    try {
      const Result = await createGenre({ name }).unwrap();
      toast.success(`${Result} Genre created successfully`);
      setName("");
      refetch();
    } catch (error) {
      toast.error("Failed to create genre");
    }
  };
  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Please enter a genre name");
      return;
    }
    try {
      const Result = await updateGenre({
        id: selectedGenre._id,
        updatedGenre: { name: updatingName },
      }).unwrap();
      toast.success(`${Result.name} Genre updated successfully`);
      setModalVisible(false);
      setUpdatingName("");
      setSelectedGenre(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update genre");
    }
  };
  const handleDeleteGenre = async () => {
    if (!selectedGenre) {
      toast.error("No genre selected for deletion");
      return;
    }
    try {
      await deleteGenre(selectedGenre._id).unwrap();
      toast.success(`${selectedGenre.name} Genre deleted successfully`);
      setModalVisible(false);
      setSelectedGenre(null);
      refetch();
    } catch (error) {
      toast.error("Failed to delete genre");
    }
  };
  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12">Manage Genres</h1>
        <Genreform
          value={name}
          setvalue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        <div className="flex flex-wrap">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                  }
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <Genreform
            value={updatingName}
            setvalue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Genrelist;
