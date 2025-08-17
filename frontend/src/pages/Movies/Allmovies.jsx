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
  const { data: genre } = useFetchGenresQuery()
  const { data: newMovies } = useNewMoviesQuery()
  const { data: randomMovies } = useRandomMoviesQuery()
  const [movieFilter, filteredMovies] = useSelector((state) => state.movies)
  const Dispatch = useDispatch()
  const movieYears = data?.map((movie) => movie.year)
  const uniqueYear = Array.from(new set(movieYears))
  useEffect(() => {
    setFilteredMovies(data || [])
    setFilteredMovies(movieYears)
    setFilteredMovies(uniqueYear)
  }, [data, Dispatch])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]" >
      <>
        <section>
          <div className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover"
            style={{ backgroundImage: `url(${banner})` }} >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>
            <div className="relative z-10 text-center text-white mt-[10rem]"></div>

          </div>
        </section>
      </>
    </div>
  )
}

export default Allmovies
