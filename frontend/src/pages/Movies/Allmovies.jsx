import React from 'react'
import { useAllMoviesQuery } from '../../redux/api/MovieSlice'
import { useFetchGenresQuery } from '../../redux/api/GenreSlice'
import { useNewMoviesQuery, useTopMoviesQuery, useRandomMoviesQuery } from '../../redux/api/MovieSlice'
import Moviecard from './Moviecard'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import banner from "../../assets/banner.jpg"
import { setMoviesFilter, setFilteredMovies, setMoviesYear, setUniqueYear } from '../../redux/features/Movies/MoviesSlice'

const Allmovies = () => {
  const { data } = useAllMoviesQuery()
  const { data: genres } = useFetchGenresQuery()
  const { data: newMovies } = useNewMoviesQuery()
  const { data: topMovies } = useTopMoviesQuery()
  const { data: randomMovies } = useRandomMoviesQuery()
  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies)
  const Dispatch = useDispatch()
  const movieYears = data?.map((movie) => movie.year)
  const uniqueYears = Array.from(new Set(movieYears))
  useEffect(() => {
    setFilteredMovies(data || [])
    setFilteredMovies(movieYears)
    setFilteredMovies(uniqueYears)
  }, [data, Dispatch])
  const handleSearchChange = (e) => {
    Dispatch(setMoviesFilter({ searchTerm: e.target.value }))
    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    Dispatch(setFilteredMovies(filteredMovies))
  }
  const handleGenreClick = (genreid) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreid);
    Dispatch(setFilteredMovies(filterByGenre));
  }
  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    Dispatch(setFilteredMovies(filterByYear));
  }
  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        Dispatch(setFilteredMovies(newMovies))
        break;
      case "top":
        Dispatch(setFilteredMovies(topMovies))
        break;
      case "random":
        Dispatch(setFilteredMovies(randomMovies))
        break;

      default:
        Dispatch(setFilteredMovies([]))
        break;
    }
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]" >
      <>
        <section>
          <div className="relative h-[35rem] w-screen mb-5 flex items-center justify-center bg-cover"
            style={{ backgroundImage: `url(${banner})` }} >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>
            <div className="relative z-10 text-center text-white mt-[10rem]">
              <h1 className='text-3xl font-bold mb-4'>The Movies Hub </h1>
              <p className='text-2xl'>Lets find the best movies in the world</p>
            </div>
            <section className="absolute -bottom-[3rem]">
              <label htmlFor="">Search </label>
              <input type="text" className='w-[20rem] h-[2rem] border-2 px-10 outline-none rounded text-1xl' placeholder='Search Movie'
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
              <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
                <label htmlFor="">Genre:</label>
                <select className="border p-2 rounded ml-4 text-white"
                  value={moviesFilter.selectedGenre}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value="">Select</option>
                  {genres?.map((genre) => (
                    <option
                      key={genre._id}
                      value={genre._id}
                    >{genre.name}</option>
                  ))}
                </select>
                <select className="border p-2 rounded ml-4 text-white" value={moviesFilter.selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}>
                  <option value="">Year</option>
                  {uniqueYears?.map((year) => (
                    <option
                      key={year}
                      value={year}
                    >{year}</option>
                  ))}
                </select>
                <select
                  className="border p-2 rounded ml-4 text-white"
                  value={moviesFilter.selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </section>
            </section>
          </div>
          <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
            {filteredMovies?.map((movie) => (
              <Moviecard key={movie._id} movie={movie} />
            ))}
          </section>
        </section>
      </>
    </div>
  )
}

export default Allmovies
