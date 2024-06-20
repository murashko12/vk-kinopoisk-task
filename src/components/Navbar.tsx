import { Link, useLocation } from "react-router-dom"
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";

const Navbar = () => {

    // const [favorites, setFavorites] = useState<boolean>(false);

    return (
        <header className="fixed top-0 z-10 flex w-full h-16 justify-center items-center bg-black ">
            <nav className="flex w-[60%] justify-between items-center">
                <Link to={'./'}>
                    <img src="/src/assets/kinopoiskLogo.svg" alt="Кинопоиск логотип" />
                </Link>
                {
                    useLocation().pathname === "/favorites" 
                    ? 
                    <Link to={'./'}>
                        <IoMdHeart size={30} color="white"/>
                    </Link>
                    :
                    <Link to={'./favorites'}>
                        <IoMdHeartEmpty size={30} color="white"/>
                    </Link>
                }                
                
            </nav>
        </header>
    )
}

export default Navbar
