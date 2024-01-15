"use client";
import { fetchPopularMovies } from "@/services/movieService";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Movie from "@/types/movie";
import { List } from "../types/list";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  <div className="flex overflow-x-auto gap-4">
    {movies.map((movie) => (
      <div key={movie.id} className="min-w-[45%] md:min-w-[22%] lg:min-w-[15%] flex-shrink-0 space-y-2">
        <div className="relative pb-[150%]">
          <Link href={`/movies/${movie.id}`}>
            <Image
              className="rounded-lg absolute inset-0 w-full h-full object-cover transform transition duration-300 hover:scale-105"
              src={`${BASE_IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              layout="fill"
            />

          </Link>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* Popular Lists This Month */}
        <section className="mt-10 px-5">
          <h2 className="text-xl text-white font-bold mb-4">
            Popular Lists This Month
          </h2>
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
        <Reviews />
      </div>

      {/* Footer or other content */}
      <Footer />
    </div>
  );
}
