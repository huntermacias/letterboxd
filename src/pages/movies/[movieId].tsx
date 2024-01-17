"use client";
import { useEffect, useState } from "react";
import Movie from "@/types/movie";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const MovieDetailPage = () => {
  const pathname = usePathname();
  const [movie, setMovie] = useState<Movie>();
  const [error, setError] = useState<string>("");
  const [trailerKey, setTrailerKey] = useState("");
  const [isTrailerModalOpen, setTrailerModalOpen] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [leadActorMovies, setLeadActorMovies] = useState([]);
  const [leadActorName, setLeadActorName] = useState("");

  // Function to open the trailer modal
  const openTrailerModal = () => {
    setTrailerModalOpen(true);
  };

  // Function to close the trailer modal
  const closeTrailerModal = () => {
    setTrailerModalOpen(false);
  };

  // Function to return a star rating
  const StarRating = ({ rating }: { rating: number }) => {
    let stars = [];
    for (let i = 1; i <= Math.round(rating); i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <span key={i} className="text-yellow-400">
            <Image
              src="/icons/star.svg"
              alt="Star Icon"
              width={20}
              height={20}
            ></Image>
          </span>
        );
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        // Half star
        stars.push(
          <span key={i} className="text-yellow-400">
            <Image
              src="/icons/star.svg"
              alt="Star Icon"
              width={20}
              height={20}
            ></Image>
          </span>
        ); // Customize this for a half-star icon
      } else {
        // Empty star
        stars.push(
          <span key={i} className="text-gray-300">
            <Image
              src="/icons/star.svg"
              alt="Star Icon"
              width={20}
              height={20}
            ></Image>
          </span>
        ); // Customize this for an empty star icon
      }
    }
    return (
      <div className="flex space-x-1 items-center justify-center">{stars}</div>
    );
  };

  useEffect(() => {
    const movieId = pathname.split("/").pop();
    if (!movieId) {
      setError("Movie ID not found.");
      return;
    }
    const fetchMovieAndCast = async (movieId: string) => {
      try {
        // Fetch movie details, which includes the cast
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=6500efce781df0e3504d6dd24db9a472&append_to_response=credits`
        );
        if (!movieResponse.ok) {
          throw new Error(`API call failed: ${movieResponse.status}`);
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Assume the first cast member is the lead actor
        const leadActor = movieData.credits.cast[0]; // Assuming the lead actor is the first listed
        if (leadActor) {
          setLeadActorName(leadActor.name); // Store the lead actor's name
          fetchLeadActorMovies(leadActor.id);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
    };

    const fetchTrailerKey = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6500efce781df0e3504d6dd24db9a472`
      );
      const data = await response.json();
      const officialTrailer = data.results.find(
        (video: { type: string; official: any }) =>
          video.type === "Trailer" && video.official
      );
      setTrailerKey(officialTrailer?.key);
    };

    if (movieId) {
      fetchMovieAndCast(movieId); // Replacing the original fetchMovieData call
      fetchTrailerKey();
      fetchRelatedMovies(movieId); // New function to fetch related movies
    }
  }, [pathname]);

  const fetchRelatedMovies = async (movieId: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=6500efce781df0e3504d6dd24db9a472`
      );
      const data = await response.json();
      setRelatedMovies(data.results);
    } catch (error) {
      console.error("Failed to fetch related movies:", error);
    }
  };

  // Fetch lead actor's movies
  const fetchLeadActorMovies = async (actorId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=6500efce781df0e3504d6dd24db9a472`
      );
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }
      const data = await response.json();
      setLeadActorMovies(data.cast); // Assuming you want the movies they've acted in
    } catch (error) {
      console.error("Failed to fetch lead actor's movies:", error);
    }
  };

  if (error) return <div className="text-center py-10">Error: {error}</div>;
  if (!movie) return <div className="text-center py-10">Loading...</div>;
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Image Section */}
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie?.title ?? "Movie"} backdrop`}
          layout="responsive"
          width={700}
          height={293}
          className="rounded-t-lg object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
        <button
          onClick={openTrailerModal}
          className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm font-medium shadow"
        >
          Watch Trailer
        </button>
        {isTrailerModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
            <div className="bg-gray-800 p-4 rounded-lg max-w-xl mx-auto">
              <iframe
                title="Movie Trailer"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full md:h-96"
              ></iframe>
              <button
                onClick={closeTrailerModal}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie?.title ?? "Movie"}`}
              width={200}
              height={300}
              className="rounded shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
            <p className="text-gray-400 my-2">
              {movie.release_date} • {movie.runtime} mins
            </p>

            {/* Rating and Genres */}
            <div className="flex items-center gap-2">
              <StarRating rating={movie.vote_average / 2} />
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Overview</h3>
              <p className="text-gray-400 mt-2">{movie.overview}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow text-sm">
                <Image
                  src="/icons/eye.svg"
                  alt="Watched Icon"
                  width={20}
                  height={20}
                  className="inline-block mr-2"
                />
                Watched
              </button>
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded shadow text-sm">
                <Image
                  src="/icons/bookmark.svg"
                  alt="Bookmark Icon"
                  width={20}
                  height={20}
                  className="inline-block mr-2"
                />
                My List
              </button>
            </div>

            {/* Rate and Review Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Rate This Movie:</h3>
              <StarRating rating={0} />
              <button className="bg-yellow-500 hover:bg-yellow-600 mt-4 px-4 py-2 rounded shadow text-sm">
                Add a Review
              </button>
            </div>
          </div>
        </div>

        {/* Related Movies Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Related Movies</h2>
          <div className="flex overflow-x-auto gap-4 mt-4 ">
            {relatedMovies.map((relatedMovie: Movie) => (
              <div key={relatedMovie.id} className="min-w-[150px]">
                <Link href={`/movies/${relatedMovie.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`}
                    alt={relatedMovie.title}
                    width={150}
                    height={225}
                    className="rounded-lg"
                  />
                </Link>
                <h3 className="text-sm mt-2">{relatedMovie.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">{leadActorName} is also seen in:</h2>
          <div className="flex overflow-x-auto gap-4 mt-4 scrollbar">
            {leadActorMovies.map((movie: Movie) => (
              <div key={movie.id} className="min-w-[150px]">
                <Link href={`/movies/${movie.id}`}>
                  
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={150}
                    height={225}
                    className="rounded-lg cursor-pointer"
                  />
                </Link>
                <h3 className="text-sm mt-2">{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
