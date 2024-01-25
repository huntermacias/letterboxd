"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useUser } from '@clerk/nextjs';


const MovieDetails = ({ movie }: any) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useUser();
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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user || !user.id) {
      // Handle the case where the user is not logged in
      console.error("You must be logged in to submit a review");
      // Optionally, redirect to login or show a message to the user
      return;
    }
  
    // Now including the user ID in the review data
    const reviewData = {
      userId: user.id,  // Including the user ID
      username: user.username, // Including the username
      movieId: movie.id,
      body: reviewText,
      rating,
    };
  
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
  
      console.log("Submitting Review:", reviewData); // Log the data being sent

      if (response.ok) {
        setReviewText("");
        setRating(0);
        // Show success message or update UI
      } else {
        // Handle error
        console.error("Failed to submit review");
        // Show error message to the user
      }
    } catch (error) {
      // Handle fetch error
      console.error("Network error:", error);
      // Show network error message to the user
    }
  };

  
  

  return (
    <div className="flex-1">
      <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
      <p className="text-gray-400 my-2">
        {movie.release_date} • {movie.runtime} mins
      </p>

      {/* Rating and Genres */}
      <div className="flex items-center gap-2">
        <StarRating rating={movie.vote_average / 2} />
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre: any) => (
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
      {/* Rate and Review Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Rate and Review This Movie:</h3>
        <form onSubmit={handleReviewSubmit}>
          <div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here"
              className="w-full p-2 text-black"
            />
          </div>
          <div>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              placeholder="Rating (1-5)"
              className="w-full p-2 text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 mt-4 px-4 py-2 rounded shadow text-sm"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieDetails;
