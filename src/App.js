import { useEffect, useState } from "react";
import './App.css'
import searchIcon from './search.svg'
import MovieCard from "./MovieCard";

function App() {
  const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=2f7165ec'
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${url}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Matrix')
  }, [])

  return (
    <div className="app">
      <h1>Movie Data Base</h1>
      <div className="search">
        <input placeholder="search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={searchIcon} alt='search' onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>)
        :
        <div className="empty">
          <h2>No movies found</h2>
        </div>}
    </div>
  );
}

export default App;
