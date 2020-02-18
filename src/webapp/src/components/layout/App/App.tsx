import React, { useEffect, useState } from "react";
import "./App.module.scss";
import IMovie from "../../../model/IMovie";
import MovieRepository from "../../../api/moviesRepository";
import MovieList from "../../movies/MovieList";

/*
  TODO : re-do via link with constants.ts
*/
export const API_URL = "http://localhost:5000/api/movies";

/*
 * "Root" component that encapsulates whole application. State is managed on this level
 * until we accommodate more elegant solution like Redux or MobX.
 */
const App: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  /*
   * Hook for loading data. Function fetchData() was made async to simplify loading data via MovieRepostiory.
   */
  useEffect(() => {
    const fetchData = async () => {
      const repo = new MovieRepository();

      const loadedMovies = await repo.getAll();
      setMovies(loadedMovies);
    };

    fetchData();
  }, []);

  /*
   * Handler for saving data (movie). Sending of updated to WebAPI should be made here...
   */
  const saveMovieHandler = (movie: IMovie) => {

    console.log(`[App]: Saving movie...`);

    setMovies(prevState => {

      fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          id: movie.id,
          title: movie.title,
          year: Number(movie.year),
          genres: movie.genres
        })
      })
      .then(response => response.json())
      .then(json => console.log(json))


      const newState = [...prevState];
      const index = prevState.findIndex(m => m.id === movie.id);
      if (index > -1) {
        newState.splice(index, 1, { ...movie });
      }
      return [...newState];
    });

  };

  return (
    <div>
      <MovieList movies={movies} onMovieSave={saveMovieHandler} />
    </div>
  );
};

export default App;
