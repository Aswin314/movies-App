import React from "react";

const Genreform = ({
  value,
  setvalue,
  handleSubmit,
  buttonText = "submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="py--3 px-4 border rounded-lg w-[60rem]"
          placeholder="Wtite Genre"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
            {buttonText}
          </button>
          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Genreform;
