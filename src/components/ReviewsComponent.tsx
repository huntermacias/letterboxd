import { getReviews } from "@/lib/getReviews";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

interface Review {
  id?: number; 
  movieId?: number; 
  body: string;
  rating: number;
  createdAt: Date;
  clerkUserId: string;
}

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getReviews().then((data) => {
      console.log("Fetched Reviews:", data);
      setReviews(data);
    });
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">
                User ID: {review.clerkUserId}
              </span>
              <span className="text-gray-400 text-sm">
                {format(new Date(review.createdAt), "PPP")}
              </span>
            </div>
            <p className="text-gray-300">{review.body}</p>
            <div className="mt-2">
              <span className="text-yellow-400">
                Rating: {review.rating} / 5
              </span>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p>No reviews available.</p>}
      </div>
    </div>
  );
};

export default ReviewsComponent;