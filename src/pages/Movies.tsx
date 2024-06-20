import axios from 'axios';
import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import { IMovieData } from '../types/IMovieData';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';

const Movies: React.FC = () => {

    const [movies, setMovies] = useState<IMovieData[]>([])

    const [filteredMovies, setFilteredMovies] = useState<IMovieData[]>([]);
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const [yearFilter, setYearFilter] = useState<number | null>(null);
    const [genreFilter, setGenreFilter] = useState<string | null>(null);


    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                    const movieIds = []
                    for(let i = 299; i <= 305; i++) {
                        movieIds.push(i)
                    }
                    const requests = movieIds.map((id) =>
                        axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
                          headers: {
                            'X-API-KEY': import.meta.env.VITE_API_KEY_4,
                            'accept': 'application/json',
                          },
                        })
                    );
                
                    const responses = await Promise.all(requests)
                    const movies = responses.map((response) => response.data)
                    setMovies(movies)
                    
                } catch (error) {
                    console.error('Error fetching movies:', error)
                }
            };
            fetchMovieData();
        }, []
    );
          
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 6
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const nPage = Math.ceil(movies.length / recordsPerPage)
    const numbersPages = [...Array(nPage + 1).keys()].slice(1)

    function prevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function changeCurrentPage(id: number) {
        setCurrentPage(id)
    }

    function nextPage() {
        if (currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    // filter

    useEffect(() => {
        const filteredMovies = movies.filter((movie) => {
          const ratingMatch = ratingFilter === null || movie.rating.kp >= ratingFilter;
          const yearMatch = yearFilter === null || movie.year >= yearFilter;
          const genreMatch = genreFilter === null || movie.genres.some((genre) => genre.name === genreFilter);
          return ratingMatch && yearMatch && genreMatch;
        });
        setFilteredMovies(filteredMovies);
      }, [movies, ratingFilter, yearFilter, genreFilter]);

    
    return (
        <div className="flex flex-col items-center mt-24">
            <div className="flex items-center justify-around rounded-lg bg-black w-[60%] mb-8 h-16">
                
                <label className="text-white flex gap-2" htmlFor="ratingFilter">
                    Рейтинг: 
                    <input className="text-black w-24 rounded-sm" type="number" value={ratingFilter || ''} onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : null)} />
                </label>
                <label className="text-white flex gap-2" htmlFor="ratingFilter">
                    Год:
                    <input className="text-black w-24 rounded-sm" type="number" value={yearFilter || ''} onChange={(e) => setYearFilter(e.target.value ? Number(e.target.value) : null)} />
                </label>
                <label className="text-white flex gap-2" htmlFor="ratingFilter">
                    Жанры:
                    <select className="text-black w-24 rounded-sm" value={genreFilter || ''} onChange={(e) => setGenreFilter(e.target.value || null)}>
                    <option value="">All</option>
                    {Array.from(new Set(movies.flatMap((movie) => movie.genres.map((genre) => genre.name)))).map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                    </select>
                </label>
            </div>
            <ul className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
                {filteredMovies.slice(firstIndex, lastIndex).map((movie) => (
                    <li key={movie.id}>
                        <MovieCard
                            id={movie.id}
                            name={movie.name}
                            year={movie.year}
                            rating={movie.rating}
                            poster={movie.poster}
                            countries={[]}
                            shortDescription={''}
                            persons={[]} genres={[]}                        
                        />
                    </li>
                ))}
            </ul>

        {/* Pagination */}
            <nav>
                <ul className="flex gap-5">
                    <li>
                        <a href="#" onClick={prevPage}  className="flex w-12 h-12 justify-center items-center border-2 border-black rounded-full">
                            <IoMdArrowRoundBack size={30} />
                        </a>
                    </li>
                    {
                        numbersPages.map((n, i) => (
                            <li key={i}>
                                <a href="#" onClick={() => changeCurrentPage(n)} className="flex w-12 h-12 justify-center items-center border-2 border-black rounded-full text-lg font-black">{n}</a>
                            </li>
                        ))
                    }
                    <li>
                        <a href="#" onClick={nextPage} className="flex w-12 h-12 justify-center items-center border-2 border-black rounded-full">
                            <IoMdArrowRoundForward size={30} />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Movies
