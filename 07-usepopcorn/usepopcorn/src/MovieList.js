import Movie from "./Movie";

export default function MovieList({ movies, onMovieSelection }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onMovieSelection={onMovieSelection}
        />
      ))}
    </ul>
  );
}
