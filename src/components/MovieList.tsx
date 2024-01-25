import React from 'react';
import MovieComponent from './MovieComponent';

const MovieList = ({ title, movies = [] }: { title: string, movies: any[] }) => {
  // Check if movies is defined and is an array
  const isMoviesArray = Array.isArray(movies);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex overflow-x-auto gap-4 mt-4">
        {isMoviesArray && movies?.map((movie) => (
          <MovieComponent key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
