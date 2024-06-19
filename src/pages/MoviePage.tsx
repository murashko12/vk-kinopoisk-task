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
        <div className="flex flex-col items-center mt-24 w-full gap-5">
            <div className="w-[60%]">
                <Link to={'/'}>
                    <button className="flex w-12 h-12 justify-center items-center border-2 border-black rounded-full">
                        <IoMdArrowRoundBack size={30} />
                    </button>
                </Link>
            </div>
            {movie ? (
                <div className="flex w-[60%] border justify-between mb-12">
                    <img
                        className=" h-[500px]"
                        src={movie.poster.url} alt={`Постекр к фильму ${movie.name}`} 
                    />          
                    <div className="w-1/2 ">
                        <h2 className="text-center font-black text-3xl">{movie.name}</h2>
                        <div className="flex">
                            <p className="border w-1/2 ">Год:</p>
                            <p className="border w-1/2 ">{movie.year}</p>
                        </div>
                        <div className="flex">
                            <p className="border w-1/2 ">Жанры: </p>
                            <ul className="border w-1/2">
                                {   
                                    movie.genres.map((genre,i) => (
                                        <li key={i} className="mr-1">{genre.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex">
                            <p className="border w-1/2">Описание:</p>
                            <p className="border w-1/2">{movie.shortDescription}</p>
                        </div>
                        <div className="flex">
                            <p className="border w-1/2">В ролях:</p>
                            <ul className="border w-1/2">
                                {   
                                    movie.persons.map((person) => (
                                        <li key={person.id} className="mr-1">{person.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex">
                            <p className="border w-1/2">Страны:</p>
                            <ul className="border w-1/2">
                                {
                                    movie.countries.map((country,i) => (
                                        <li key={i} className="mr-1">{country.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default MoviePage
