import { Routes , Route } from "react-router-dom";
import  {MovieList , MovieDetails, Search, PageNotFound} from "../pages";

export const AllRoute=() =>{
    return (
      <Routes>
        <Route
          path="/"
          element={
            <MovieList api="movie/now_playing" title="Home - CineMate" />
          }
        />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route
          path="movies/popular"
          element={<MovieList api="movie/popular" title="Popular - CineMate" />}
        />
        <Route
          path="movies/top"
          element={
            <MovieList api="movie/top_rated" title="Top_rated - CineMate" />
          }
        />
        <Route
          path="movies/upcoming"
          element={
            <MovieList api="movie/upcoming" title="Upcoming - CineMate" />
          }
        />
        <Route path="search" element={<Search api="search/movie" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
}