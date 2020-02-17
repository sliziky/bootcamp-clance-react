import axios from "axios";
import { GENRE_URL } from "./constants";
import IGenre from "../model/IGenre";

class GenreRepository {
  getAll = async (): Promise<IGenre[]> => {
    const { data } = await axios.get<IGenre[]>(GENRE_URL);

    console.log(`[GenreRepository.getAll]: Retrieved data`, data);

    return data;
  };
}

export default GenreRepository;
