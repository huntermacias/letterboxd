"use client";
import { fetchPopularMovies } from "@/services/movieService";
import Image from "next/image";
import { useEffect, useState } from "react";
import Movie from "@/types/movie";
import { List } from "../types/list";
import Reviews from "../components/Reviews";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";




export default function Home() {

  
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser(); // Use Clerk's useUser hook


  // Dummy data for lists
  const lists: List[] = [
    {
      id: 1,
      name: "Best Thriller Movies",
      user: {
        id: 101,
        name: "@amylainez",
        favorite_movies: ["695721"],
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
        favorite_movies: [],
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading movies
      </div>
    );

  return (
    <div className="bg-gray-950 text-gray-300 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="flex justify-between items-center p-5 bg-gray-900 rounded-b-xl shadow-md">

        {/* Greeting */}
        <h1 className="text-2xl font-bold text-white">
        Hello, <span className="text-red-400">{user ? `@${user.username}` : "Guest"}</span>!
        </h1>
      <UserButton afterSignOutUrl="/" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Popular Films Section */}
        <section aria-labelledby="popular-films-heading" className="py-5">
          <h2
            id="popular-films-heading"
            className="text-2xl font-bold text-white px-5 mb-4"
          >
            Popular Films This Month
          </h2>
          <div className="flex overflow-x-auto gap-4 px-5">
            {movies.map((movie) => (
              <div key={movie.id} className="w-40 md:w-64 flex-shrink-0">
                <Link href={`/movies/${movie.id}`}>
                  <Image
                    className="rounded-xl transform transition duration-300 hover:scale-105"
                    src={`${BASE_IMAGE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    width={160}
                    height={240}
                    layout="responsive"
                  />
                </Link>
                {/* <UserButton afterSignOutUrl="/" /> */}

              </div>
            ))}
          </div>
        </section>

        {/* Popular Lists Section */}
        <section aria-labelledby="popular-lists-heading" className="py-5">
          <h2
            id="popular-lists-heading"
            className="text-2xl font-bold text-white px-5 mb-4"
          >
            Popular Lists This Month
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
            {lists.map((list) => (
              <div
                key={list.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <Image
                  className="rounded-lg mb-3"
                  src={`${BASE_IMAGE_URL}${list.poster_path}`}
                  alt={list.name}
                  width={200}
                  height={300}
                />
                <h3 className="text-lg text-white mb-2">{list.name}</h3>

                <div className="flex items-center">
                  <Image
                    className="rounded-full mr-2"
                    src={list.user.avatar!}
                    alt={list.user.name}
                    width={30}
                    height={30}
                  />
                  <div>
                    <p className="text-sm text-white">{list.user.name}</p>
                    <p className="text-xs text-gray-400">
                      Likes: {list.likes} Comments: {list.comments}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Friends' Reviews */}
        <hr className="border-gray-700 mt-2" />

        <Reviews />
      </main>

      {/* Footer */}
      <hr className="border-gray-700 mt-2" />
      {/* <BottomNavBar /> */}
      {/* <Footer /> */}
    </div>
  );
}
