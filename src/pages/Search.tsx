"use client";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Search = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

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
    <div className="bg-gray-950 min-h-screen text-white p-4">
      <div className="container mx-auto">
        {/* Search Input */}
        <div className="flex justify-center mb-6">
          <Input
            type="text"
            placeholder="Search for movies, genres, etc."
            className="bg-gray-800 rounded-lg p-3 w-full max-w-xl focus:ring-2 focus:ring-blue-500"
          />
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
			SVGstyle={{"display": "inline"}}
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
            placeholder="Type your review
here."
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
