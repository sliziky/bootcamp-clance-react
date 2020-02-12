import React from "react";
import "./MovieList.module.scss";
import IMovie from "../../model/IMovie";
import MovieContainer from "./MovieContainer";

interface IMovieListProps {
  movies: IMovie[];
  onMovieSave: (movie: IMovie) => void;
}

/*
 * Component displaying collection (list) of movies. It iterates over movies and renders <MovieContainer> component for each of them.
 * Notice that every dynamically created component should have its unique key (<div key={...} /> in this case).
 * It is also worth of noticing that layout of components is made responsible via Bootstrap grid system.
 */
const MovieList: React.FC<IMovieListProps> = ({ movies, onMovieSave }) => {
  return (
    <>
      <div className="container">
        <h2>Movies</h2>
        <div className="row">
          {movies.map(m => (
            <div key={m.id} className="col-xl-4 col-lg-6 col-sm-12">
              <MovieContainer movie={m} onMovieSave={onMovieSave} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
