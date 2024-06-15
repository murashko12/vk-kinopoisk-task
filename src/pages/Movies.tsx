import axios from 'axios';
import React, { useState, useEffect } from 'react'

const API_KEY = 'S0E5P34-4H24F3W-MZE6933-JABY92A'
const API_URL = 'https://api.kinopoisk.dev/v1.4/movie/666'

interface IMovieData {
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
    const [movie, setMovie] = useState<IMovieData | null>(null)
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        'accept': 'application/json',
                        'X-API-KEY': API_KEY
                    }
                })
                setMovie(response.data)
                console.log(response.data)
                
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }
        fetchMovieData()
    }, []);
    return (
        <div>
            {movie ? (
            <div>

                <h2>{movie.id}</h2>
                <h2>{movie.name}</h2>
                <h2>{movie.year}</h2>
                <h2>{movie.rating.kp}</h2>
                <img 
                    src={movie.poster.url} 
                    alt={`Постекр фильма "${movie.name}"`} 
                />
            </div>
            ) : (
            <p>Loading...</p>
            )}

        </div>
    )
}

export default Movies
