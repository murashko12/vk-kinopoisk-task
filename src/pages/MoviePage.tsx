import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { IMovieData } from '../types/IMovieData'

const MoviePage = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState<IMovieData | null>(null)
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
                    headers: {
                      'X-API-KEY': import.meta.env.VITE_API_KEY_1,
                      'accept': 'application/json',
                    },
                })
                setMovie(response.data)
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }      
        fetchMovieData()  
    }, [id])
    return (
        <div>
            {movie ? (
            <div>
                <h2>{movie.name}</h2>  
                <img src={movie.poster.url} alt={`Постекр к фильму ${movie.name}`} />          
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default MoviePage
