"use client";
import { fetchPopularMovies } from "@/services/movieService";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Movie from "@/types/movie";
import { List } from "../types/list";
import { Review } from "../types/review";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const StarRating = ({ rating }: { rating: number }) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(<span key={i} className="text-yellow-400">⭐</span>);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        // Half star
        stars.push(<span key={i} className="text-yellow-400">⭐</span>); // Customize this for a half-star icon
      } else {
        // Empty star
        stars.push(<span key={i} className="text-gray-300">⭐</span>); // Customize this for an empty star icon
      }
    }
    return <div>{stars}</div>;
  };
  

  // Dummy data for lists
  const lists: List[] = [
    {
      id: 1,
      name: "Best Thriller Movies",
      user: {
        id: 101,
        name: "@amylainez",
        avatar: "/images/avatars/amy.jpg", // Replace with actual avatar path
      },
      likes: 120,
      comments: 30,
      poster_path: "/qjhahNLSZ705B5JP92YMEYPocPz.jpg", // Placeholder path
    },
    {
      id: 2,
      name: "Top Sci-Fi Adventures",
      user: {
        id: 102,
        name: "@huntermacias",
        avatar: "/images/avatars/me.jpg", // Replace with actual avatar path
      },
      likes: 95,
      comments: 42,
      poster_path: "/jE5o7y9K6pZtWNNMEw3IdpHuncR.jpg", // Placeholder path
    },
    // Add more lists as needed
  ];

  // Dummy data for reviews
const reviews: Review[] = [
  {
    id: 1,
    movieName: 'Shooter',
    movieImage: '/2aWGxo1E5polpBjPvtBRkWp7qaS.jpg',
    reviewText: 'This movie was absolutely mind-blowing. All around solid action-thriller with Mark Wahlberg in his element. Luis Guzman served as a fun sidekick and Kate Mara is a stunner. Shame this didnt do better at the box office, wouldve liked to have a sequel',
    user: {
      name: '@huntermacias',
      avatar: '/images/avatars/me.jpg',
    },
    stars: 5,
    commentsCount: 15
  },
  // ... add more reviews
];
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError(null);
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  return (
    <div className="bg-[#1F1D36] w-full h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center p-5">
        {/* Greeting */}
        <div className="text-3xl font-bold">
          <span className="text-white">Hello, </span>
          <span className="text-red-300">Amy</span>
          <span className="text-white">!</span>
        </div>

        {/* User icon and notification */}
        <div className="flex items-center">
          <div className="w-11 h-11 bg-stone-300 rounded-full relative">
            <Image
              className="rounded-full"
              src="/images/avatars/amy.jpg"
              alt="Amy"
              layout="fill"
            />
          </div>
          <div className="absolute w-3 h-3 bg-green-600 rounded-full ml-8 mb-8"></div>
        </div>
      </div>

      {/* Subtitle */}
      <div className="text-white text-sm lg:text-lg font-semibold px-5 tracking-wider">
        Review or track film you’ve watched...
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Popular Films This Month */}
        <h2 className="text-white text-lg font-semibold px-5 tracking-wider mt-10">
          Popular Films This Month
        </h2>
        <div className="flex items-center mt-2">
          <div className="flex overflow-x-auto space-x-4 px-4 scrollbar">
            {/* Dynamic movie posters */}
            {movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 ">
                <Image
                  className="rounded-lg"
                  src={`${BASE_IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width={100}
                  height={200}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Popular Lists This Month */}
        <h2 className="text-white text-lg font-semibold px-5 tracking-wider mt-10">
          Popular Lists This Month
        </h2>
        <div className="flex items-center mt-4">
          <div className="flex overflow-x-auto space-x-8 px-4 scrollbar">
            {lists.map((list) => (
              <div key={list.id} className="space-y-4">
                <div>
                  <Image
                    className="rounded-lg"
                    src={`${BASE_IMAGE_URL}${list.poster_path}`}
                    alt={list.name}
                    width={100} // Adjust based on your layout
                    height={200} // Adjust based on your layout
                  />
                  <h3 className="text-white text-sm mt-2 font-medium">
                    {list.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    className="rounded-full"
                    src={list.user.avatar}
                    alt={list.user.name}
                    width={30}
                    height={30}
                  />
                  <div className="flex flex-col">
                    <span className="text-red-300 text-xs tracking-wider">
                      {list.user.name}
                    </span>
                    <div className="flex space-x-2 mt-1">
                      <span className="text-blue-300 text-xs">
                        ❤️ {list.likes}
                      </span>
                      <span className="text-white text-xs">
                        💬 {list.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Friends’ Review */}
  
<h2 className="text-white text-lg font-semibold px-5 tracking-wider mt-10">
  Recent Friends Reviews
</h2>
<div className="px-5 mt-4">
  {reviews.map((review) => (
    <div key={review.id} className="flex items-start space-x-4 mb-6">
      {/* User Info and Review Text */}
      <div className="flex-shrink-0">
        <Image
          className="rounded-full"
          src={review.user.avatar}
          alt={review.user.name}
          width={50}
          height={50}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-white text-lg font-medium">{review.movieName}</h3>
        <p className="text-gray-400 text-xs">Reviewed by <span className='text-red-300'>{review.user.name}</span></p>
        <div className="flex space-x-4">
        <StarRating rating={review.stars} />
        <p className="text-white text-md"> 💬 {review.commentsCount}</p>

        </div>
        <p className="text-white text-xs">{review.reviewText}</p>
        <button className="text-red-500 text-xs mt-2">Read more</button>
      </div>

      {/* Movie Image */}
      <div className="flex-shrink-0">
        <Image
          className="rounded-lg"
          src={`${BASE_IMAGE_URL}${review.movieImage}`}
          alt={review.movieName}
          width={100} // Adjust based on your layout
          height={150} // Adjust based on your layout
        />
      </div>
    </div>
  ))}
</div>

      </div>

      {/* Footer or other content */}
      {/* ... */}
    </div>
  );
}
