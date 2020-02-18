import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import styles from "./MovieEdit.module.scss";
import IMovie from "../../model/IMovie";
import axios from "axios";
import IGenre from "../../model/IGenre";
import "bootstrap/dist/css/bootstrap.min.css";
import GenreRepository from "../../api/genresRepository";
import GenreEdit from "../genres/GenreEdit";
export const GENRE_URL = "http://localhost:5000/api/genres";

interface IMovieEditProps {
  movie: IMovie;

  onMovieSave: (movie: IMovie) => void;
}

/*
 * Component for editing information about particular movie, that is passed in props.
 */
const MovieEdit: React.FC<IMovieEditProps> = ({ movie, onMovieSave: onSaveMovie }) => {
  const [editedMovie, setEditedMovie] = useState<IMovie>({ ...movie });
  

  /*
   * Handler for saving movie. Passes signal to parent component.
   */
  const movieSaveHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    onSaveMovie(editedMovie);
  };

  const [genres, setGenres] = useState<IGenre[]>([]);
  /*
   * Handler for managing changes in <input> elements and incorporating these into edited movie.
   */
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value: string | number = e.target.value;

    setEditedMovie(prevState => {
      const newState: any = { ...prevState };
      newState[name] = value;
      return newState as IMovie;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const repo = new GenreRepository();
      const loadedGenres = await repo.getAll();
      setGenres(loadedGenres);
    };
    fetchData();
  }, []);

  const onCheckboxChecked = (genre: IGenre, checked: boolean) => {
    var checked = editedMovie.genres.includes(genre);
  };

  return (
    <>
      <div className="card-header">{movie.title}</div>
      <div className="card-body" style={{ padding: "15px" }}>
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="tbxMovieName">Title</label>
            <input
              className="form-control"
              type="text"
              id="tbxMovieName"
              name="title"
              value={editedMovie.title}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tbxYear">Year</label>
            <input
              className="form-control"
              type="number"
              id="tbxYear"
              name="year"
              value={editedMovie.year}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tbxGenre">Genre</label>
            <GenreEdit movie={editedMovie} onCheckboxChecked={onCheckboxChecked} />
          </div>
        </form>
      </div>

      <div className="card-footer">
        <button type="button" className="btn btn-sm btn-primary" data-movie-id={movie.id} onClick={movieSaveHandler}>
          Save
        </button>
      </div>
    </>
  );
};

export default MovieEdit;
