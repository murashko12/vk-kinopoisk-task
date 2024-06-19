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
    // const [genresFilter, setGenresFilter] = useState<IGenre | null>(null)

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
                            'X-API-KEY': import.meta.env.VITE_API_KEY_2,
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
        const filtered = movies.filter((movie) => {
            if (ratingFilter !== null && movie.rating.kp < ratingFilter) {
                return false;
            }
            if (yearFilter !== null && movie.year <= yearFilter) {
                return false;
            }
            // if (genresFilter !== null && movie.genres.includes(genresFilter))
            // return true;
        });
            setFilteredMovies(filtered);
        }, [movies, ratingFilter, yearFilter])
    
        const handleRatingFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setRatingFilter(event.target.value ? Number(event.target.value) : null);
        }
    
        const handleYearFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setYearFilter(event.target.value ? Number(event.target.value) : null);
        }

        // const handleGenresFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //     setGenresFilter(event.target.value || null)
        // }
    
    return (
        <div className="flex flex-col items-center mt-24">
            <div className="flex items-center justify-around rounded-lg bg-black w-[60%] mb-8 h-16">
                <div>
                    <label htmlFor="ratingFilter" className="text-white">РЕЙТИНГ: </label>
                    <select id="ratingFilter" value={ratingFilter || ''} onChange={handleRatingFilterChange}>
                        <option value="">Все</option>
                        <option value="5">5 и выше</option>
                        <option value="7">7 и выше</option>
                        <option value="8">8 и выше</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="yearFilter" className="text-white">ГОД: </label>
                    <select id="yearFilter" value={yearFilter || ''} onChange={handleYearFilterChange}>
                        <option value="">Все</option>
                        <option value="1990">1990</option>
                        <option value="2000">2000</option>
                        <option value="2010">2010</option>
                    </select>
                </div>
                {/* <div> */}
                    {/* <label className="text-white" htmlFor="ratingFilter">ЖАНРЫ: </label>
                    <select  id="ratingFilter">
                        <option value="">Все</option>
                        <option value="5">5 и выше</option>
                        <option value="7">7 и выше</option>
                        <option value="8">8 и выше</option>
                    </select> */}
                {/* </div> */}
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
