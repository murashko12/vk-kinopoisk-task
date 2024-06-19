import axios from 'axios';
import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import { IMovieData } from '../types/IMovieData';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<IMovieData[]>([])

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                    const movieIds = []
                    for(let i = 299; i <= 379; i++) {
                        movieIds.push(i)
                    }
                    const requests = movieIds.map((id) =>
                        axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
                          headers: {
                            'X-API-KEY': import.meta.env.VITE_API_KEY_3,
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
    const recordsPerPage = 50
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = movies.slice(firstIndex, lastIndex)
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

    return (
        <div className="flex flex-col items-center mt-24">
            <ul className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
                {records.map((movie) => (
                    <li key={movie.id}>
                        <MovieCard
                            id={movie.id}
                            name={movie.name}
                            year={movie.year}
                            rating={movie.rating}
                            poster={movie.poster}
                            countries={[]}
                            shortDescription={''}
                            persons={[]} genres={[]}                        />
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
