import { useState } from "react";
import { Link } from "react-router-dom"
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";

const Navbar = () => {

    const [favorites, setFavorites] = useState<boolean>(false);

    return (
        <header className="flex w-full h-16 justify-center items-center bg-black ">
            <nav className="flex w-11/12 justify-between items-center">
                <Link to={'./'} onClick={() => setFavorites(false)}>
                    <img src="/src/assets/kinopoiskLogo.svg" alt="Кинопоиск логотип" />
                </Link>
                {
                    favorites 
                    ? 
                    <Link to={'./'} onClick={() => setFavorites(false)}>
                        <IoMdHeart size={30} color="white"/>
                    </Link>
                    :
                    <Link to={'./favorites'} onClick={() => setFavorites(true)}>
                        <IoMdHeartEmpty size={30} color="white"/>
                    </Link>
                }                
            </nav>
        </header>
    )
}

export default Navbar
