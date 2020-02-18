import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import IMovie from "../../model/IMovie";
import IGenre from "../../model/IGenre";
import "bootstrap/dist/css/bootstrap.min.css";
import GenreRepository from "../../api/genresRepository";

export const GENRE_URL = "http://localhost:5000/api/genres";

interface IGenreListProps {
  movie: IMovie;
  onCheckboxChecked: (genre: IGenre, checked: boolean) => void;
}

const matchGenreToId: Record<string, number> = {
  Fantasy: 1,
  Action: 2,
  Adventure: 3,
  "Sci-fi": 4
};

const GenreEdit: React.FC<IGenreListProps> = ({ movie, onCheckboxChecked }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);

  var checked: Record<string, boolean> = {
    Fantasy: false,
    Action: false,
    Adventure: false,
    "Sci-fi": false
  };

  useEffect(() => {
    const fetchData = async () => {
      const repo = new GenreRepository();
      const loadedGenres = await repo.getAll();
      setGenres(loadedGenres);
    };
    fetchData();
  }, []);

  const genreAlreadyAdded = (genre : IGenre) => {
      return movie.genres.find(i => i.id === genre.id) !== undefined;
  }

  const myIndex = (genres : IGenre[], genre : IGenre) => {
      for (var i = 0; i < genres.length; ++i) {
        if (genres[i].id === genre.id) {
            return i;
        }
      }
      return -1;
  }

  const handleCheckboxChange = (genreName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    checked[genreName] = !checked[genreName];
    var wantsToAddGenre = checked[genreName];
    var wantsToDeleteGenre = !wantsToAddGenre;
    var genre: IGenre = { name: genreName, id: matchGenreToId[genreName] };
    var genreAdded = genreAlreadyAdded(genre);
    if (wantsToAddGenre && !genreAdded) {
        movie.genres.push(genre);
      }
      else if (wantsToDeleteGenre && genreAdded) {
        const index = myIndex(movie.genres,genre);
        if (index > -1) {
          movie.genres.splice(index, 1);
        }
      }
  };

  //TODO redo
  const shouldBeChecked = (movieGenre: string) => {
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
      <ul>
        {genres.map(item => (
          <li>
            <label>
              {item.name}
              <input
                type="checkbox"
                name="check"
                defaultChecked={shouldBeChecked(item.name)}
                onChange={e => handleCheckboxChange(item.name, e)}
              />
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GenreEdit;
