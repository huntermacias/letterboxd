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
    <div className="bg-[#1F1D36] text-white">
      {/* Hero Image with Trailer Button */}
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie?.title ?? "Movie"} backdrop`}
          layout="responsive"
          width={700}
          height={293}
          className="rounded-lg object-cover w-full"
        />
        <button className="absolute bottom-4 right-4 bg-red-600 px-4 py-2 rounded text-sm md:text-base">
          Watch Trailer
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 py-2">
        {/* Movie Poster and Details */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Movie Poster */}
          <div className="w-32 md:w-48 lg:w-64 mx-auto md:mx-0">
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
              <h1 className="text-2xl font-bold text-center md:text-left">
                {movie.title}
              </h1>
              <p className="text-gray-400 text-center md:text-left text-sm">
                {movie.release_date} • {movie.runtime} mins
              </p>
            </div>

            {/* Rating and Genres */}
            <div className="my-2 text-center md:text-left">
              <StarRating rating={movie.vote_average / 2} />
              <div className="flex justify-center md:justify-start flex-wrap gap-2 mt-1">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <p className="mt-4 text-justify md:text-left text-sm">
              {movie.overview}
            </p>

            {/* Watched/My List Buttons */}
            <div className="flex justify-center md:justify-start space-x-4 my-4">
              <button className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 rounded text-sm text-white shadow-lg">
                <Image
                  src="/icons/eye.svg" // Ensure this icon path is correct and accessible in the public/icons folder.
                  alt="Watch Icon"
                  width={20}
                  height={20}
                  className="inline-block mr-2"
                />
                Watched
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-pink-600 hover:bg-pink-700 transition-colors duration-200 rounded text-sm text-white shadow-lg">
                <Image
                  src="/icons/bookmark.svg" // Ensure this icon path is correct and accessible in the public/icons folder.
                  alt="Bookmark Icon"
                  width={20}
                  height={20}
                  className="inline-block mr-2"
                />
                My List
              </button>
            </div>

            {/* Rate This Movie */}
            <div className="mt-4">
              <h2 className="text-xl font-bold">Rate This Movie</h2>
              <StarRating rating={0} />
            </div>

            {/* Add a Review */}
            <button className="bg-yellow-500 px-4 py-2 rounded my-4">
              Add a Review
            </button>
          </div>
        </div>
        {/* User Reviews */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
          {/* Placeholder for user reviews */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
