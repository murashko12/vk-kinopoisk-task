import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { IMovieData } from '../types/IMovieData'
import { IoMdArrowRoundBack } from 'react-icons/io'

const MoviePage: React.FC = () => {
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
            <Link to={'/'}>
                <button className="">
                    <IoMdArrowRoundBack size={30} />
                </button>
            </Link>
            {movie ? (
                <div>
                    <h2>{movie.name}</h2>  
                    <img src={movie.poster.url} alt={`Постекр к фильму ${movie.name}`} />          
                </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default MoviePage
