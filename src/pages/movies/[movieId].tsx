"use client";
import { useEffect, useState } from "react";
import Movie from "@/types/movie";
import { usePathname } from "next/navigation";
// import { StarIcon } from '@heroicons/react/solid'; // Ensure you have `@heroicons/react` installed
import Image from "next/image";

// This is a placeholder for the StarRating component. You should implement it according to your needs.
// const StarRating = ({ rating: }) => {
//   // Your star rating logic here...
//   return <div>{/* Your stars */}</div>;
// };

const MovieDetailPage = () => {
  const pathname = usePathname();
  const [movie, setMovie] = useState<Movie>();
  const [error, setError] = useState<string>("");
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
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=6500efce781df0e3504d6dd24db9a472`
        );
        if (!response.ok) {
          throw new Error(`API call failed: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
    };

    fetchMovieData();
  }, [pathname]);

  if (error) return <div className="text-center py-10">Error: {error}</div>;
  if (!movie) return <div className="text-center py-10">Loading...</div>;
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Image with Overlay and Trailer Button */}
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie?.title ?? "Movie"} backdrop`}
          layout="responsive"
          width={700}
          height={293}
          className="rounded-t-xl object-cover w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent rounded-t-xl" />
        <button className="absolute bottom-4 right-4 bg-red-700 hover:bg-red-800 px-4 py-2 rounded shadow-lg transition duration-300 ease-in-out text-sm md:text-base">
          Watch Trailer
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 py-2">
        {/* Movie Poster and Details */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-4">
          {/* Movie Poster */}
          <div className="w-36 md:w-52 lg:w-64 mx-auto md:mx-0 shadow-lg rounded-lg overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie?.title ?? "Movie"}`}
              width={200}
              height={300}
              className="rounded-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
            {/* Title, Release Date, Duration */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
                {movie.title}
              </h1>
              <p className="text-gray-400 text-center md:text-left text-sm mt-1">
                {movie.release_date} • {movie.runtime} mins
              </p>
            </div>

            {/* Rating and Genres */}

            <div className="my-3 text-center md:text-left">
              <div className="inline-flex items-center mb-1">
                <StarRating rating={movie.vote_average / 2} />
                <span className="ml-2 text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-center md:justify-start flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-400 text-sm">{movie.overview}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-3 my-4">
              <button className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition duration-300 ease-in-out text-sm font-medium">
                <img
                  src="/icons/eye.svg"
                  alt="Watch Icon"
                  className="inline-block mr-2"
                  width={24}
                  height={24}
                />
                Watched
              </button>
              <button
                className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700
  rounded-lg shadow transition duration-300 ease-in-out text-sm font-medium"
              >
                <img
                  src="/icons/bookmark.svg"
                  alt="Bookmark Icon"
                  className="inline-block mr-2"
                  width={24}
                  height={24}
                />
                My List
              </button>
            </div>

            {/* Rate and Review Section */}
            <div className="mt-6">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <h3 className="text-xl font-semibold mr-3">Rate This Movie:</h3>
                <StarRating rating={0} />
              </div>
              <button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-sm px-6 py-3 rounded-lg shadow transition duration-300 ease-in-out">
                Add a Review
              </button>
            </div>
          </div>
        </div>

        {/* User Reviews Section */}
        <div className="mt-10 px-4 py-2">
          <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
          {/* Placeholder for user reviews */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
