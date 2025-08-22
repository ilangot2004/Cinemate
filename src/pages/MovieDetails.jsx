import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTYwNjAwY2Q4OTBmYWQ3Yjg3YmMxYjk5Mjk0NWJmMCIsIm5iZiI6MTcyODU0ODczNS4yNzgsInN1YiI6IjY3MDc4ZjdmYzkyYzJlNTZkODYxNDQ2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sHtcQI-Z62tkZ3OE1pUSK-JJOSRGYGlyIXp1FAY7K0k",
    },
  };

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&page=1&region=IN`,
        options
      );
      const data = await res.json();
      setMovie(data);
    }

    async function fetchTrailer() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&page=1&region=IN`,
        options
      );
      const data = await res.json();
      const trailer = data.results.find((vid) => vid.type === "Trailer");
      setTrailerKey(trailer?.key || null);
    }

    fetchMovie();
    fetchTrailer();
  }, [id]);

  useEffect(() => {
    if (movie?.title) {
      document.title = `${movie.title} - CineMate`;
    } else {
      document.title = "CineMate – Movie Details";
    }
  }, [movie?.title]);

  if (!movie) return <main className="text-center p-10">Loading...</main>;

  const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const backdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

  return (
    <main
      className="max-w-[1800px] relative text-white flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      style={{
        backgroundImage: `url(${backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/70 w-full h-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={poster}
            alt={movie.title}
            className="rounded-2xl shadow-lg w-72"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">
            {movie.title}{" "}
            <span className="text-gray-300">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>
          {movie.tagline && (
            <p className="italic text-gray-300">{movie.tagline}</p>
          )}

          <div className="my-2 flex flex-wrap gap-2">
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="bg-white/30 px-3 py-1 rounded text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="leading-relaxed opacity-90">{movie.overview}</p>

          <div className="flex gap-6 text-sm opacity-80 flex flex-wrap items-center gap-3 text-sm text-gray-200">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                {movie.vote_average.toFixed(1)}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <a
                href="#"
                className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
              >
                {movie.vote_count} reviews
              </a>
            </div>

            <span className="w-1 h-1 rounded-full bg-gray-400"></span>

            <span>
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </span>
            <span>
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}{" "}
              ({movie.production_countries?.[0]?.iso_3166_1 || "N/A"})
            </span>

          </div>

          {trailerKey && (
            <button
              onClick={() => setShowTrailer(true)}
              className="mt-4 px-6 py-2 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 flex items-center gap-2 w-fit"
            >
              ▶ Watch Trailer
            </button>
          )}
        </div>
      </div>

      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-black rounded-2xl overflow-hidden shadow-lg relative w-11/12 md:w-3/4 lg:w-1/2">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieDetails;
