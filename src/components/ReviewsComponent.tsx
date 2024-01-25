import { getReviews } from "@/lib/getReviews";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

// Assuming this is your Review interface
// export interface Review {
//   id: number;
//   movieId: number;
//   body: string;
//   rating: number;
//   createdAt: Date;
//   updatedAt: Date;
//   clerkUserId: string; // Make sure this is included
//   // user: { ... } // Include if you have user details
// }


const ReviewsComponent = () => {
  // const [reviews, setReviews] = useState<Review[]>([]);

  // useEffect(() => {
  //   getReviews().then((fetchedReviews) => {
  //     console.log("Fetched Reviews:", fetchedReviews);
  //     const transformedReviews = fetchedReviews.map(review => ({
  //       ...review,
  //       clerkUserId: review.clerkUserId, // Transform userId to clerkUserId
  //     }));
  //     setReviews(transformedReviews);
  //   });
  // }, []);

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      <div className="space-y-4">
        {/* {reviews.map((review) => (
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
        {reviews.length === 0 && <p>No reviews available.</p>} */}
      </div>
    </div>
  );
};

export default ReviewsComponent;
