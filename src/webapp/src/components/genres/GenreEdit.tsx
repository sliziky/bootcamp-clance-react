import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import IMovie from "../../model/IMovie";
import IGenre from "../../model/IGenre";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import GenreRepository from "../../api/genresRepository";

/*
    Move checkbox stuff into MovieEdit? 
*/

interface IGenreListProps {
  movie: IMovie;
}

const GenreEdit: React.FC<IGenreListProps> = ({ movie }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  
  const testingMap = {
    0: true,
    1: true,
    2: false,
    3: false
  }
  /*
    Probably not the best idea to get genres every time
  */
  let genreChecked = new Map<number, boolean>();
  
  useEffect(() => {
    const fetchData = async () => {
      const repo = new GenreRepository();
      const loadedGenres = await repo.getAll();
      setGenres(loadedGenres);
    };
    fetchData();
  });

  const genreAlreadyAdded = (genre: IGenre) => {
    return movie.genres.find(i => i.id === genre.id) !== undefined;
  };


  const handleCheckboxChange = (genre: IGenre, e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    genreChecked.set(genre.id, !genreChecked.get(genre.id));
    var wantsToAddGenre = genreChecked.get(genre.id);
    var wantsToDeleteGenre = !wantsToAddGenre;
    var genreAdded = genreAlreadyAdded(genre);
    testingMap[genre.id - 1] = !testingMap[genre.id - 1];

    if (wantsToAddGenre && !genreAdded) {
      movie.genres.push(genre);
    } else if (wantsToDeleteGenre && genreAdded) {
      const index = movie.genres.findIndex(g => g.id === genre.id);
      if (index > -1) {
        movie.genres.splice(index, 1);
      }
    }
  };

  return (
    <>
      <label htmlFor="tbxGenre">Genre</label>
      <ListGroup>
        {genres.map((genre, i) => (
          <label>
            <ListGroupItem
              key={i}
              active={testingMap[i]}
              onClick={e => handleCheckboxChange(genre, e)}
            >
              {genre.name}
            </ListGroupItem>
          </label>
        ))}
      </ListGroup>
    </>
  );
};

export default GenreEdit;
/*
              <input
                type="checkbox"
                name="check"
                defaultChecked={shouldBeDefaultChecked(item.name)}
                onChange={e => handleCheckboxChange(item.name, e)}
              />
*/
