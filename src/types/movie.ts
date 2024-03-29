interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  overview: string;
  vote_average: number;
  budget: number;
  trailerId: string;
  relatedMovies: Movie[];
  // Add other properties as needed
}

export default Movie;
