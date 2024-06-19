import React from 'react'
import { IoMdHeart } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { IMovieData } from '../types/IMovieData';
import { useDispatch } from 'react-redux';
import { addRemoveFavorites } from '../redux/slices/favoriteSlice';
import { Link } from 'react-router-dom';

const MovieCard: React.FC<IMovieData> = (data) => {
    
    const dispatch = useDispatch()

    const onAddRemoveFavorites = (data: IMovieData) => {
        dispatch(addRemoveFavorites(data))
    }

    return (
        <div key={data.id} className="relative w-[260px] h-[500px] mb-10 shadow-xl rounded-lg overflow-hidden">
            <div className="absolute top-2 left-2 p-1 flex justify-between items-center w-16 h-12 bg-slate-200 rounded-md shadow-xl">
                <IoMdStar size={25} color="#ebae34"/>
                <p>{data.rating.kp.toFixed(1)}</p>
            </div>
            <button onClick={() => onAddRemoveFavorites(data)} className="absolute top-2 right-2 flex items-center justify-center w-12 h-12 bg-slate-200 rounded-md shadow-xl">
                <IoMdHeart size={30} color="red"/>
            </button>
            <Link key={data.id} to={`/${data.id}`}>
                <div className="w-full">
                    <img src={data.poster.url} alt={`Постекр к фильму ${data.name}`} />
                </div>
                    <div className="flex items-center justify-center mx-2 h-20 object-cover">
                        <h2 className="text-xl font-black text-center overflow-hidden">{data.name}</h2>
                    </div>
                <div className="flex w-full justify-around">
                    <p>год:</p>
                    <p>{data.year}</p>
                </div>
            </Link>
        </div>
    )
}

export default MovieCard
