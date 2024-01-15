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
      movieName: "Shooter",
      movieImage: "/2aWGxo1E5polpBjPvtBRkWp7qaS.jpg",
      reviewText:
        "This movie was absolutely mind-blowing. All around solid action-thriller with Mark Wahlberg in his element...",
      user: {
        name: "@huntermacias",
        avatar: "/images/avatars/me.jpg",
      },
      stars: 5,
      commentsCount: 15,
    },
    {
      id: 2,
      movieName: "X-Men",
      movieImage: "/bRDAc4GogyS9ci3ow7UnInOcriN.jpg", // Replace with actual image path
      reviewText:
        "X-Men started it all - a thrilling adventure with characters that have depth, and a storyline that's engaging.",
      user: {
        name: "@amylainez",
        avatar: "/images/avatars/amy.jpg", // Replace with actual avatar path
      },
      stars: 3,
      commentsCount: 42,
    },
    {
      id: 3,
      movieName: "X2: X-Men United",
      movieImage: "/pwQo1ehiPBqAbiVqD6rfNM8GCFE.jpg", // Replace with actual image path
      reviewText:
        "A sequel that outdoes the original in every way. The action is better, the stakes are higher, and the characters get more depth.",
      user: {
        name: "@huntermacias",
        avatar: "/images/avatars/me.jpg", // Replace with actual avatar path
      },
      stars: 3.7,
      commentsCount: 37,
    },
    // ... Add more X-Men movie reviews as needed
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
    <div className="bg-[#1F1D36] w-full min-h-screen flex flex-col text-gray-300">
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
      <div className="text-white text-2xl lg:text-lg font-semibold px-5 tracking-wider">
        Review or track film you’ve watched...
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto py-5">
        {/* Popular Films This Month */}
        <section className="mt-10 px-5">
          <h2 className="text-xl text-white font-bold mb-4">
            Popular Films This Month
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 space-y-2">
                <Image
                  className="rounded-lg transform hover:scale-105 transition duration-300"
                  src={`${BASE_IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Lists This Month */}
        <section className="mt-10 px-5">
  <h2 className="text-xl text-white font-bold mb-4">Popular Lists This Month</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            {lists.map((list) => (
              <div
                key={list.id}
                className="bg-[#262547] p-4 rounded-lg shadow-lg"
              >
                <Image
                  className="rounded-lg"
                  src={`${BASE_IMAGE_URL}${list.poster_path}`}
                  alt={list.name}
                  width={200}
                  height={300}
                />
                <h3 className="text-lg text-white mt-2">{list.name}</h3>
                <div className="flex items-center mt-3">
                  <Image
                    className="rounded-full"
                    src={list.user.avatar}
                    alt={list.user.name}
                    width={30}
                    height={30}
                  />
                  <div className="ml-2">
                    <span className="text-sm text-white">{list.user.name}</span>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-blue-300 mr-2">
                        ❤️ {list.likes}
                      </span>
                      <span className="text-xs text-white">
                        💬 {list.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Friends’ Review */}
        <section className="mt-10 px-5">
          <h2 className="text-xl text-white font-bold mb-4">
            Recent Friends Reviews
          </h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="flex space-x-4">
                <div className="w-1/3">
                  <Image
                    className="rounded-lg"
                    src={`${BASE_IMAGE_URL}${review.movieImage}`}
                    alt={review.movieName}
                    width={100}
                    height={150}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg text-white font-medium">
                        {review.movieName}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Reviewed by{" "}
                        <span className="text-red-300">{review.user.name}</span>
                      </p>
                      <StarRating rating={review.stars} />
                    </div>
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full"
                        src={review.user.avatar}
                        alt={review.user.name}
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <p className="text-white text-sm mt-2">{review.reviewText}</p>
                  <button className="text-red-500 text-xs mt-2">
                    Read more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer or other content */}
      <footer className="bg-[#262547] text-white py-10">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-between">
      {/* Footer Column 1 */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <h4 className="font-bold text-lg mb-4">About</h4>
        <p className="text-gray-400">Discover the best movies, watch trailers, read reviews, and more on our platform.</p>
      </div>

      {/* Footer Column 2 */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
        <ul>
          <li className="mb-2"><a href="#" className="text-gray-400 hover:text-red-300">Home</a></li>
          <li className="mb-2"><a href="#" className="text-gray-400 hover:text-red-300">Popular Movies</a></li>
          <li><a href="#" className="text-gray-400 hover:text-red-300">Latest Reviews</a></li>
        </ul>
      </div>

      {/* Footer Column 3 */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <h4 className="font-bold text-lg mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-red-300">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-red-300">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-red-300">Instagram</a>
        </div>
      </div>

      {/* Footer Column 4 */}
      <div className="w-full md:w-1/4">
        <h4 className="font-bold text-lg mb-4">Contact</h4>
        <p className="text-gray-400">For inquiries, please email us at support@example.com</p>
      </div>
    </div>

    <div className="border-t border-gray-700 mt-10 pt-8">
      <p className="text-center text-gray-400 text-sm">
        &copy; {(new Date()).getFullYear()} Your Platform Name. All rights reserved.
      </p>
    </div>
  </div>
</footer>

    </div>
  );
}
