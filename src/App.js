import { useEffect, useState } from "react";
import './App.css'
import searchIcon from './search.svg'
import MovieCard from "./MovieCard";
import ReturnButton from "./ReturnButton";

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

  const enterHandler = (event) => {
    if(event.key === 'Enter'){
      searchMovies(searchTerm)
      console.log('działa')
    }
  }
 

  return (
    <div className="app">
      <ReturnButton/>
      <h1>Movie Data Base</h1>
      <div className="search">
        <input placeholder="search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={enterHandler}/>
        <button className="img_btn"  onClick={() => searchMovies(searchTerm)} >        
        <img src={searchIcon} alt='search' />
        </button>
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
