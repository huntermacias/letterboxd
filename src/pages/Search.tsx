"use client";
import React, { useEffect, useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";

import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Movie from "@/types/movie";
import { UserButton } from "@clerk/nextjs";
// import debounce from 'lodash.debounce'; // You might need to install lodash.debounce

const Search = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Function to close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setSearchResults([]); // This will close the dropdown
    }
  };

  useEffect(() => {
    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove click event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to fetch search results
  const fetchSearchResults = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6500efce781df0e3504d6dd24db9a472&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Debounced search function to limit API calls while typing
  // const debouncedSearch = debounce(fetchSearchResults, 300);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    fetchSearchResults(query);
  };

 // Search Dropdown Item Component
 const SearchDropdownItem = ({ movie }: { movie: Movie }) => {
  // Define default image URL for missing posters
  const defaultImageUrl = "/images/movies/batman.jpg"; // Replace with your placeholder image URL
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : defaultImageUrl;

  return (
    <div className="flex items-center p-2 hover:bg-gray-800 cursor-pointer border-b border-indigo-700">
      <div className="flex-none w-16 h-24 relative">
      <UserButton afterSignOutUrl="/" />

        <Image
          src={imageUrl}
          alt={movie.title}
          layout="fill"
          className="rounded"
          objectFit="cover"
        />
      </div>
      <div className="ml-4">
        <div className="font-semibold">{movie.title}</div>
        <div className="text-sm text-gray-400">
          Rating: {movie.vote_average} / Duration: {movie.runtime} mins
        </div>
      </div>
    </div>
  );
};

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
    // other logic
  };

  const handleReset = () => {
    setRating(0);
    setReview("");
    setDate(new Date());
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="container mx-auto">
        {/* Search Input */}
        <div className="flex justify-center mb-6 relative" ref={searchContainerRef}>
          <div className="w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for movies, genres, etc."
              className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-1 w-3/6 bg-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                {searchResults.slice(0, 5).map((movie) => (
                  <SearchDropdownItem key={movie} movie={movie} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date Selection */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Select Date You Watched
          </h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Star Rating */}
        <div className="flex justify-center mb-6">
          <Rating
            onClick={handleRating}
            initialValue={rating}
            SVGstyle={{ display: "inline" }}
            size={30}
            fillColor="rgb(234 88 12)" // Orange color
            className="star-rating"
          />
          <Button
            onClick={handleReset}
            className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-2 rounded shadow"
          >
            Reset
          </Button>
        </div>

        {/* Review Input */}
        <div className="max-w-xl mx-auto">
          <Label htmlFor="message-2" className="text-lg font-semibold mb-2">
            Your Review
          </Label>
          <Textarea
            placeholder="Type your review here."
            id="message-2"
            className="bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            value={review}
            onChange={handleReviewChange}
          />
          <p className="text-sm text-gray-400 mt-2">
            Word Count: {review.split(/\s+/).filter(Boolean).length} / 500
          </p>
          <p className="text-sm text-gray-400">
            Your review will be public on your profile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
