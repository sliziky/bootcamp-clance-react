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

const matchGenreToId: Record<string, number> = {
  Fantasy: 1,
  Action: 2,
  Adventure: 3,
  "Sci-fi": 4
};

const GenreEdit: React.FC<IGenreListProps> = ({ movie }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  /*
    Probably not the best idea to get genres every time
  */
  useEffect(() => {
    const fetchData = async () => {
      const repo = new GenreRepository();
      const loadedGenres = await repo.getAll();
      setGenres(loadedGenres);
    };
    fetchData();
  }, []);

  /*
    Better aproach to remember checked boxes than map?
  */
  var checked: Record<string, boolean> = {
    Fantasy: false,
    Action: false,
    Adventure: false,
    "Sci-fi": false
  };

  const genreAlreadyAdded = (genre: IGenre) => {
    return movie.genres.find(i => i.id === genre.id) !== undefined;
  };

  const handleCheckboxChange = (genreName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    checked[genreName] = !checked[genreName];
    var wantsToAddGenre = checked[genreName];
    var wantsToDeleteGenre = !wantsToAddGenre;
    var genre: IGenre = { name: genreName, id: matchGenreToId[genreName] };
    var genreAdded = genreAlreadyAdded(genre);

    if (wantsToAddGenre && !genreAdded) {
      movie.genres.push(genre);
    } else if (wantsToDeleteGenre && genreAdded) {
      const index = movie.genres.findIndex(g => g.id === genre.id);
      if (index > -1) {
        movie.genres.splice(index, 1);
      }
    }
  };
  const shouldBeDefaultChecked = (movieGenre: string) => {
    for (let genre of movie.genres) {
      if (genre.name === movieGenre) {
        checked[genre.name] = true;
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <label htmlFor="tbxGenre">Genre</label>
      <ListGroup>
        {genres.map((item, i) => (
          <label>
            <ListGroupItem
              key={i}
              active={shouldBeDefaultChecked(item.name)}
              onClick={e => handleCheckboxChange(item.name, e)}
            >
              {item.name}
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
