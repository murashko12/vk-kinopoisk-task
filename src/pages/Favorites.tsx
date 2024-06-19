import MovieCard from "../components/MovieCard"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"

const Favorites = () => {

    const favoritesItems = useSelector((state: RootState) => state.favoritesReducer.favorites)

    return (
        <div className="flex justify-center mt-24">
            <ul className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
                {favoritesItems?.map((movie) => 
                    <li key={movie.id}>
                        <MovieCard
                            id={movie.id}
                            name={movie.name}
                            year={movie.year}
                            rating={movie.rating}
                            poster={movie.poster} 
                            genres={[]} 
                            countries={[]} 
                            shortDescription={""} 
                            persons={[]}                        
                        />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Favorites
