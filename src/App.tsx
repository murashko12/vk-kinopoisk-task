import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Movies from './pages/Movies'
import Favorites from './pages/Favorites'
import MoviePage from './pages/MoviePage'

function App() {
    return (
        <>
			<Navbar />
			<Routes>
				<Route path={'/'} element={<Movies/>} />
				<Route path={'/:id'} element={<MoviePage/>} />
				<Route path={'/favorites'} element={<Favorites/>} />
			</Routes>
        </>
	)
}

export default App
