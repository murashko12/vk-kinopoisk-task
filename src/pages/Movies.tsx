import axios from 'axios';
import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';

const API_KEY = 'S0E5P34-4H24F3W-MZE6933-JABY92A'


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
                    const movieIds = [345, 550, 666];
                    const requests = movieIds.map((id) =>
                        axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
                          headers: {
                            'X-API-KEY': API_KEY,
                            'accept': 'application/json',
                          },
                        })
                    );
                
                    const responses = await Promise.all(requests);
                    const movies = responses.map((response) => response.data);
                    setMovies(movies);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            };
            fetchMovieData();
        }, []
    );
          
    return (
        <div>
            <ul className="flex gap-10">
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
