import { useState, useEffect } from "react"

import MovieCard from "./MovieCard"

import './App.css'
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com/?apikey=efe2acba'

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search)
    }


    useEffect(() => {
        searchMovies('avengers')
    }, [])

    return (
        <div className="app">
            <h1>Movee</h1>

            <div className="search">
                <input 
                    placeholder="Search for a movie"
                    value={searchValue}  
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search-icon"
                    onClick={() => searchMovies(searchValue)}
                />
            </div>

            {movies.length > 0 
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    )
}

export default App