import axios from 'axios';
import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';

export interface IMovieData {
    id: number;
    name: string;
    year: number;
    rating: {
        kp: number
    };
    poster: {
        url: string
    }
}

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<IMovieData[]>([])
    
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                    const movieIds = []
                    for(let i = 299; i <= 300; i++) {
                        movieIds.push(i)
                    }
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
                    <li key={movie.id}>
                        <MovieCard
                            id={movie.id} 
                            name={movie.name} 
                            year={movie.year} 
                            rating={movie.rating} 
                            poster={movie.poster} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Movies
