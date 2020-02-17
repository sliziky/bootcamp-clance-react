import IMovie from "../model/IMovie";
import axios from "axios";
import { API_URL } from "./constants";

class MovieRepository {
  getAll = async (): Promise<IMovie[]> => {
    const { data } = await axios.get<IMovie[]>(API_URL);

    console.log(`[MovieRepository.getAll]: Retrieved data`, data);

    return data;
  };

  save = async (movie: IMovie): Promise<IMovie> => {
    const response = await axios.post<IMovie>(API_URL, movie);

    console.log(`[MovieRepository.getAll]: Retrieved response`, response);

    return response.data;
  };
}

export default MovieRepository;
