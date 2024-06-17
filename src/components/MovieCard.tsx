import React from 'react'
import { IoMdHeart } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { IMovieData } from '../types/IMovieData';

const MovieCard: React.FC<IMovieData> = (data) => {
    return (
        <div key={data.id} className="relative w-[260px] h-[500px] mb-10 shadow-xl rounded-lg overflow-hidden">
            <div className="absolute top-2 left-2 flex justify-around items-center w-24 h-12 bg-slate-200 rounded-md shadow-xl">
                <IoMdStar size={30} color="#ebae34"/>
                <p>{data.rating.kp}</p>
            </div>
            <div className="absolute top-2 right-2 flex items-center justify-center w-12 h-12 bg-slate-200 rounded-md shadow-xl">
                <IoMdHeart size={30} color="red"/>
            </div>
            <div className="w-full">
                <img src={data.poster.url} alt={`Постекр к фильму ${data.name}`} />
            </div>
            <h2 className="text-2xl font-black text-center">{data.name}</h2>
            <div className="flex w-full justify-around">
                <p>год:</p>
                <p>{data.year}</p>
            </div>
            <div className="flex w-full justify-around">
                <p>Жанр:</p>
                <p>боевик</p>
            </div>
        </div>
    )
}

export default MovieCard
