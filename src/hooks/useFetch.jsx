import { useEffect, useState } from "react";

const useFetch = (api,queryTerm="") => {
  const [data, setData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTYwNjAwY2Q4OTBmYWQ3Yjg3YmMxYjk5Mjk0NWJmMCIsIm5iZiI6MTcyODU0ODczNS4yNzgsInN1YiI6IjY3MDc4ZjdmYzkyYzJlNTZkODYxNDQ2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sHtcQI-Z62tkZ3OE1pUSK-JJOSRGYGlyIXp1FAY7K0k",
    },
  };

  useEffect(() => {
    async function fectchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${api}?query=${queryTerm}`,
        options
      );

      const data = await response.json();
      setData(data.results);
    }
    fectchMovies();
  }, [api, queryTerm]);

  return {
    data,
  };
};

export default useFetch;
