import axios from 'axios';
import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import { IMovieData } from '../types/IMovieData';
import { Link } from 'react-router-dom';

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<IMovieData[]>([])
    
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                    const movieIds = [299]
                    // for(let i = 299; i <= 300; i++) {
                    //     movieIds.push(i)
                    // }
                    const requests = movieIds.map((id) =>
                        axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
                          headers: {
                            'X-API-KEY': import.meta.env.VITE_API_KEY_1,
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
          
    return (
        <div className="">
            
            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {movies.map((movie) => (
                    <Link key={movie.id} to={`/${movie.id}`}>
                        <li>
                            <MovieCard
                                id={movie.id} 
                                name={movie.name} 
                                year={movie.year} 
                                rating={movie.rating} 
                                poster={movie.poster} 
                            />
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Movies
