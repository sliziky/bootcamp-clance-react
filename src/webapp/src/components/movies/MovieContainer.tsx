import React, { useState } from "react";
import styles from "./MovieContainer.module.scss";
import IMovie from "../../model/IMovie";
import MovieEdit from "./MovieEdit";
import MovieDisplay from "./MovieDisplay";

interface IMovieContainerProps {
  movie: IMovie;

  onMovieSave: (movie: IMovie) => void;
}

/*
 * Compoment for displaying movie card including movie name, thumbnail image and other attributes.
 * Determines if movie should be in edit mode or displayed only.
 */
const MovieContainer: React.FC<IMovieContainerProps> = ({ movie, onMovieSave }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  /*
   * Event handler for saving movie, it is passed to underlying component (<MovieEdit />).
   * It also turns of edit mode.
   */
  const saveMovieHandler = (movie: IMovie) => {
    onMovieSave(movie);
    setEditMode(false);
  };

  /*
   * Event handler for starting movie editing. Sets flag 'editMode' and that "switches" rendered component from <MoveDisplay /> to <MovieEdit />.
   */
  const editMovieHandler = (movie: IMovie) => {
    setEditMode(true);
  };

  const cancelEditMovieHandler = () => {
    setEditMode(false);
  }

  return (
    <div className={`card ${styles.movieContainer}`}>
      {editMode ? (
        <MovieEdit movie={movie} onMovieSave={saveMovieHandler} onCancelEdit={cancelEditMovieHandler} />
      ) : (
        <MovieDisplay movie={movie} onMovieEdit={editMovieHandler} />
      )}
    </div>
  );
};

export default MovieContainer;
