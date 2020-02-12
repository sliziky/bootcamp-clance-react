import IMovie from "../model/IMovie";
import Axios from "axios";
import { API_URL } from "./constants";

class MovieRepository {
  getAll = async (): Promise<IMovie[]> => {
    const { data } = await Axios.get<IMovie[]>(API_URL);

    console.log(`[MovieRepository.getAll]: Retrieved data`, data);

    return data;
  };

  save = async (movie: IMovie): Promise<IMovie> => {
    const response = await Axios.post<IMovie>(API_URL, movie);

    console.log(`[MovieRepository.getAll]: Retrieved response`, response);

    return response.data;
  };
}

export default MovieRepository;
