import React, { useState, useEffect } from "react";
import IGenre from "../../model/IGenre";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import GenreRepository from "../../api/genresRepository";

interface IGenreListProps {
  currentGenres: IGenre[];
  onGenreChange: (genres: IGenre[]) => void;
}

const GenreEdit: React.FC<IGenreListProps> = ({ currentGenres, onGenreChange }) => {
  const [allGenres, setAllGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const repo = new GenreRepository();
      const loadedGenres = await repo.getAll();
      setAllGenres(loadedGenres);
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (genre: IGenre, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const newGenres = [...currentGenres];
    const foundIndex = currentGenres.findIndex(g => g.id === genre.id);
    if (foundIndex < 0) {
      newGenres.push(genre);
    } else {
      newGenres.splice(foundIndex, 1);
    }

    onGenreChange(newGenres);
  };

  const isGenreChecked: (genre: IGenre) => boolean = genre => {
    return !!currentGenres.find(g => g.id === genre.id);
  };

  return (
    <>
      <label htmlFor="tbxGenre"><strong>Genre</strong></label>
      <ListGroup>
        {allGenres.map((genre, i) => (
          <label key={i}>
            <ListGroupItem active={isGenreChecked(genre)} onClick={e => handleCheckboxChange(genre, e)}>
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
