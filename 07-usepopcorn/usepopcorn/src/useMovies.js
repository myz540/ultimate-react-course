import { useEffect, useState } from "react";

const OMDB_API_KEY = "a573478c";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        setError("");
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Failure fetching data");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //setSelectedId(null);
      fetchMovies();
      return () => controller.abort();
    },
    [query]
  );

  return { movies, isLoading, error };
}
