import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

const Search = ({ api }) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");

  const { data: movies } = useFetch(api, queryTerm);

  useEffect(() => {
      document.title = `${queryTerm} - CineMate`;
    }, [queryTerm]);

  return (
    <main>
      <section className="w-full py-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
          {movies.length === 0
            ? `No Results Found for "${queryTerm}"`
            : `Results for "${queryTerm}"`}
        </h2>
        <div className="mt-3 flex justify-center">
          <hr className="w-1/3 border-t-2 border-gray-300" />
        </div>
      </section>

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

export default Search;
