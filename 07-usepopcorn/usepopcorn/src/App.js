import { useState, useEffect, useRef } from "react";
import Box from "./Box";
import "./index.css";
import { NavBar, Search, NumResults } from "./NavBar";
import { WatchedMoviesList, WatchedSummary } from "./Watched";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";

const OMDB_API_KEY = "a573478c";

export default function App() {
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query, () =>
    setSelectedId(null)
  );

  function handleMovieSelection(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // local storage
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleRemoveWatched(movie) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== movie.imdbID));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && !error && <Loader />}
          {error && <ErrorMessage errorMessage={error} />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onMovieSelection={handleMovieSelection}
            />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={() => setSelectedId(null)}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveFromWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
