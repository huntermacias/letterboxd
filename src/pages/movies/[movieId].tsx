"use client";
import { useEffect, useState } from "react";
import Movie from "@/types/movie";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getAuth } from '@clerk/nextjs/server';
import MovieList from "@/components/MovieList";
import HeroImage from "@/components/HeroSection";
import MovieDetails from "@/components/MovieDetails";
import ReviewsComponent from "@/components/ReviewsComponent";

export async function getServerSideProps(context: any) {
  try {
    const auth = await getAuth(context.req);

    if (!auth.userId) {
      // Handle unauthenticated user
      return { props: { user: null } };
    }
    return { props: { user: { id: auth.userId } } };
  } catch (error:any) {
    console.error("Error fetching current user:", error);
    return { props: { error: error.message } };
  }
}

const MovieDetailPage = (user: any) => {
  const pathname = usePathname();
  const [movie, setMovie] = useState<Movie>();
  const [error, setError] = useState<string>("");
  const [trailerKey, setTrailerKey] = useState("");
  const [isTrailerModalOpen, setTrailerModalOpen] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [leadActorMovies, setLeadActorMovies] = useState([]);
  const [leadActorName, setLeadActorName] = useState("");



  // Function to return a star rating

  useEffect(() => {
    const movieId = pathname.split("/").pop();
    if (!movieId) {
      setError("Movie ID not found.");
      return;
    }
    const fetchMovieAndCast = async (movieId: string) => {
      try {
        // Fetch movie details, which includes the cast
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=6500efce781df0e3504d6dd24db9a472&append_to_response=credits`
        );
        if (!movieResponse.ok) {
          throw new Error(`API call failed: ${movieResponse.status}`);
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Assume the first cast member is the lead actor
        const leadActor = movieData.credits.cast[0]; // Assuming the lead actor is the first listed
        if (leadActor) {
          setLeadActorName(leadActor.name); // Store the lead actor's name
          fetchLeadActorMovies(leadActor.id);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
    };

    const fetchTrailerKey = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6500efce781df0e3504d6dd24db9a472`
      );
      const data = await response.json();
      const officialTrailer = data.results.find(
        (video: { type: string; official: any }) =>
          video.type === "Trailer" && video.official
      );
      setTrailerKey(officialTrailer?.key);
    };

    if (movieId) {
      fetchMovieAndCast(movieId); // Replacing the original fetchMovieData call
      fetchTrailerKey();
      fetchRelatedMovies(movieId); // New function to fetch related movies
    }
  }, [pathname]);

  const fetchRelatedMovies = async (movieId: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=6500efce781df0e3504d6dd24db9a472`
      );
      const data = await response.json();
      setRelatedMovies(data.results);
    } catch (error) {
      console.error("Failed to fetch related movies:", error);
    }
  };

  // Fetch lead actor's movies
  const fetchLeadActorMovies = async (actorId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=6500efce781df0e3504d6dd24db9a472`
      );
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }
      const data = await response.json();
      setLeadActorMovies(data.cast); // Assuming you want the movies they've acted in
    } catch (error) {
      console.error("Failed to fetch lead actor's movies:", error);
    }
  };

  if (error) return <div className="text-center py-10">Error: {error}</div>;
  if (!movie) return <div className="text-center py-10">Loading...</div>;
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Image Section */}
      <HeroImage movie={movie} trailerKey={trailerKey} />

      {/* Main Content */}
      <div className="p-4">
       
        <div className="flex flex-col md:flex-row gap-4">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie?.title ?? "Movie"}`}
              width={200}
              height={300}
              className="rounded shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <MovieDetails movie={movie} />
        </div>
          <ReviewsComponent />

        <MovieList title="Related Movies" movies={relatedMovies} />

        <MovieList
          title={`${leadActorName} is also seen in:`}
          movies={leadActorMovies}
        />

      </div>
    </div>
  );
};

export default MovieDetailPage;
