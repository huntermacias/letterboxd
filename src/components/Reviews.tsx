import { Review } from "@/types/review";
import Image from "next/image";
import React from "react";

const Reviews = () => {
  // Dummy data for reviews
  const reviews: Review[] = [
    {
      id: 1,
      movieId: 101, // Dummy movie ID
      body: "This movie was absolutely mind-blowing. All around solid action-thriller with Mark Wahlberg in his element...",
      rating: 5,
      createdAt: new Date('2023-01-01T00:00:00Z'), // Example date
      updatedAt: new Date('2023-01-01T00:00:00Z'), // Example date
      clerkUserId: 'user_2bPc3HCyrCaKS8piwsvNhNTjLEW', // Dummy user ID
      // Add user details if necessary
    },
    {
      id: 2,
      movieId: 102, // Dummy movie ID
      body: "X-Men started it all - a thrilling adventure with characters that have depth, and a storyline that's engaging.",
      rating: 3,
      createdAt: new Date('2023-02-01T00:00:00Z'), // Example date
      updatedAt: new Date('2023-02-01T00:00:00Z'), // Example date
      clerkUserId: 'user_2bPc3HCyrCaKS8piwsvNhNTjLEW', // Dummy user ID
      // Add user details if necessary
    },
    {
      id: 3,
      movieId: 103, // Dummy movie ID
      body: "A sequel that outdoes the original in every way. The action is better, the stakes are higher, and the characters get more depth.",
      rating: 4,
      createdAt: new Date('2023-03-01T00:00:00Z'), // Example date
      updatedAt: new Date('2023-03-01T00:00:00Z'), // Example date
      clerkUserId: 'user_2bPc3HCyrCaKS8piwsvNhNTjLEW', // Dummy user ID
      // Add user details if necessary
    },
    // ... Add more reviews as needed
  ];
  

  //   const base_image_url = process.env.BASE_IMAGE_URL;
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  const StarRating = ({ rating }: { rating: number }) => {
    let stars = [];
    for (let i = 1; i <= Math.round(rating); i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <span key={i} className="text-yellow-400">
            ⭐
          </span>
        );
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        // Half star
        stars.push(
          <span key={i} className="text-yellow-400">
            ⭐
          </span>
        ); // Customize this for a half-star icon
      } else {
        // Empty star
        stars.push(
          <span key={i} className="text-gray-300">
            ⭐
          </span>
        ); // Customize this for an empty star icon
      }
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <section className="mt-10 px-5">
      <h2 className="text-xl text-white font-bold mb-4">
        Recent Friends Reviews
      </h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex space-x-4">
            <div className="w-1/3">
              {/* <Image
                className="rounded-lg"
                src={`${BASE_IMAGE_URL}${review.movieImage}`}
                alt={review.movieName}
                width={100}
                height={150}
              /> */}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg text-white font-medium">
                    {/* {review.movieName} */}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Reviewed by{" "}
                    <span className="text-red-300">{review.clerkUserId}</span>
                  </p>
                  {/* <StarRating rating={review.stars} /> */}
                </div>
                <div className="flex-shrink-0">
                  {/* <Image
                    className="rounded-full"
                    src={review.user.avatar}
                    alt={review.user.name}
                    width={50}
                    height={50}
                  /> */}
                </div>
              </div>
              <p className="text-white text-sm mt-2">{review.body}</p>
              <button className="text-red-500 text-xs mt-2">Read more</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
