import React, { useEffect } from "react";
import styles from "./MovieDisplay.module.scss";
import IMovie from "../../model/IMovie";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Collapse, CardBody } from "reactstrap";
interface IMovieDisplayProps {
  movie: IMovie;

  onMovieEdit: (movie: IMovie) => void;
}

/*
 * Component for displaying information about particular movie, that is passed in props.
 */
const MovieDisplay: React.FC<IMovieDisplayProps> = ({ movie, onMovieEdit }) => {
  /*
   * Handler for starting edit mode. This component only sends information about desire to enter edit mode to parent component.
   */
  const movieEditHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    onMovieEdit(movie);
  };

  const [max, setMax] = useState(0);

  useEffect(() => {
    const calculateAverageRating = () => {
      const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
      setMax(Math.round(average(movie.ratings) * 10) / 10);
    };
    calculateAverageRating();
  }, [movie.ratings]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="card-header">{movie.title}</div>
      <div className="card-body" style={{ padding: "15px" }}>
        <div className={`${styles.movieDetails} row`}>
          <div className="col-6" style={{ paddingRight: "7px" }}>
            <img src={movie.thumbnailUrl} className={styles.movieThumbnail} alt={movie.title} />
          </div>
          <div className="col-6" style={{ paddingLeft: "7px" }}>
            <table className={`${styles.movieGenres} table table-sm`}>
              <tbody>
                <tr>
                  <th>Year:</th>
                  <td>{movie.year}</td>
                </tr>
                <tr>
                  <th>Genres:</th>
                  <td>
                    <ul>
                      {movie.genres.map(g => (
                        <li key={g.id}>{g.name}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th><a href="#" onClick={toggle}>Rating</a></th>
                  <td>
                    <span>{max}</span>
                    <Collapse isOpen={isOpen}>
                      <ListGroup>
                        <ListGroupItem>Max: <b>{Math.max(...movie.ratings)}</b></ListGroupItem>
                        <ListGroupItem>Min: <b>{Math.min(...movie.ratings)}</b></ListGroupItem>
                        <ListGroupItem>Votes: <b>{movie.ratings.length}</b></ListGroupItem>
                      </ListGroup>
                    </Collapse>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          data-movie-id={movie.id.toString()}
          onClick={movieEditHandler}
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default MovieDisplay;
