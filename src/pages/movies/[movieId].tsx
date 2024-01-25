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
import { db } from "@/lib/db";

interface MovieDetailPageProps {
  user: any;
  reviews: any[];
}

const MovieDetailPage = ({ user, reviews }: MovieDetailPageProps) => {
  const pathname = usePathname();
  const [movie, setMovie] = useState<Movie>();
  const [error, setError] = useState<string>("");
  const [trailerKey, setTrailerKey] = useState("");
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [leadActorMovies, setLeadActorMovies] = useState([]);
  const [leadActorName, setLeadActorName] = useState("");
  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
  console.log('API_KEY', API_KEY);

  useEffect(() => {
    const movieId = pathname.split("/").pop();
    if (!movieId) {
      setError("Movie ID not found.");
      return;
    }

    const fetchMovieAndCast = async (movieId: string) => {
      try {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
        if (!movieResponse.ok) {
          throw new Error(`API call failed: ${movieResponse.status}`);
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const leadActor = movieData.credits.cast[0];
        if (leadActor) {
          setLeadActorName(leadActor.name);
          fetchLeadActorMovies(leadActor.id);
        }
      } catch (err:any) {
        setError(err.message || "An error occurred");
      }
    };

    const fetchTrailerKey = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`API call failed: ${response.status}`);
        }
        const data = await response.json();
    
        if (data && data.results) {
          const officialTrailer = data.results.find(
            (video: { type: string; official: any }) => video.type === "Trailer" && video.official
          );
          setTrailerKey(officialTrailer?.key);
        } else {
          console.error("No trailer data found");
        }
      } catch (error) {
        console.error("Failed to fetch trailer key:", error);
      }
    };
    

    const fetchRelatedMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`);
        const data = await response.json();
        setRelatedMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch related movies:", error);
      }
    };

    fetchMovieAndCast(movieId);
    fetchTrailerKey();
    fetchRelatedMovies();
  }, [pathname]);

  const fetchLeadActorMovies = async (actorId: number) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }
      const data = await response.json();
      setLeadActorMovies(data.cast);
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
          <ReviewsComponent reviews={reviews} />

        <MovieList title="Related Movies" movies={relatedMovies} />

        <MovieList
          title={`${leadActorName} is also seen in:`}
          movies={leadActorMovies}
        />

      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const auth = await getAuth(context.req);

    const reviews = await db.review.findMany({
      include: {
        user: true, 
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      props: {
        user: auth.userId ? { id: auth.userId } : null,
        reviews: JSON.parse(JSON.stringify(reviews)),
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return { props: { error: error.message } };
  }
}

export default MovieDetailPage;


