import { useEffect } from "react";
import Card from "../components/Card";
import useFetch from "../hooks/useFetch";

const MovieLists = ({ api, title }) => {
  const { data: movies } = useFetch(api);

  useEffect(() => {
    document.title = `${title}`;
  }, [title]);

  return (
    <main>
      <section className="max-w-6xl mx-auto py-7">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {movies?.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MovieLists;
