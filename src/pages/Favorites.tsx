import { RootState } from "../redux/store"
import { useSelector } from "react-redux"

const Favorites = () => {

    const favoritesItems = useSelector((state: RootState) => state.favoritesReducer.favorites)

    // if (favoritesItems) {
    //     return (
    //         <div>
    //             <p>Тут пусто</p>
    //         </div>
    //     )
    // }

    return (
        <div className="">
            <ul>
                {favoritesItems?.map((movie) => 
                    <li>{movie.name}</li>
                )}
            </ul>
        </div>
    )
}

export default Favorites
