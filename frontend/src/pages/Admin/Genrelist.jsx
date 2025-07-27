import React from "react";
import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useGenrelistQuery,
} from "../../redux/api/GenreSlice";
import { toast } from "react-toastify";
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
      </div>
    </div>
  );
};

export default Genrelist;
