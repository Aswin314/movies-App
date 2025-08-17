import React from 'react'
import { useState } from 'react'
import { useNewMoviesQuery, useRandomMoviesQuery, useTopMoviesQuery } from '../../redux/api/MovieSlice'
import { useFetchGenresQuery } from '../../redux/api/GenreSlice'
import SliderUtil from '../../Components/SliderUtil'
const MovieContainerPage = () => {
  const { data } = useNewMoviesQuery()
  const { data: Topmovies } = useTopMoviesQuery()
  const { data: Randommovies } = useRandomMoviesQuery()
  const { data: Genre } = useFetchGenresQuery()
  const [selectedgenre, setselectedgenre] = useState(null)
  const handleGenreClick = (genreId) => {
    setselectedgenre(genreId)
  }
  const filteredMovies = data?.filter(
    (movie) => selectedgenre === null || movie.genre === selectedgenre
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center">
      <nav className=" ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
        {Genre?.map((g) => (
          <button
            key={g._id}
            className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg
               ${selectedgenre === g._id ? "bg-gray-200" : ""
              }`}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>
      <section className="flex flex-col justify-center items-center w-full lg:w-auto">
        <div className="w-full lg:w-[100rem] mb-8 ">
          <h1 className="mb-5">Choose For You</h1>
          <SliderUtil data={Randommovies} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5">Top Movies</h1>
          <SliderUtil data={Topmovies} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  )
}

export default MovieContainerPage
