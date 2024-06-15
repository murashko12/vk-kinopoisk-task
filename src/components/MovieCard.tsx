import React from 'react'
import { IoMdHeart } from "react-icons/io";
import { IMovieData } from '../pages/Movies'
import { IoMdStar } from "react-icons/io";

const MovieCard: React.FC<IMovieData> = (data) => {
    return (
        <div key={data.id} className="relative w-[260px] h-[500px] mb-10 shadow-xl rounded-lg overflow-hidden">
            <div className="absolute top-2 right-2 flex items-center justify-center w-12 h-12 bg-slate-200 rounded-full shadow-xl">
                <IoMdHeart size={30} color="red"/>
            </div>
            <img src={data.poster.url} alt="" className="w-full" />
            <h2 className="text-2xl font-black text-center">{data.name}</h2>
            <div className="flex w-full justify-around">
                <p>год:</p>
                <p>{data.year}</p>
            </div>
            <div className="flex w-full justify-around">
                <p>Жанр:</p>
                <p>боевик</p>
            </div>
            <div className="flex w-full justify-around">
                <IoMdStar size={20} color="#ebae34"/>
                <p>{data.rating.kp}</p>
            </div>
        </div>
    )
}

export default MovieCard
