import Link from 'next/link';
import Image from 'next/image';

const MovieComponent = ({ movie }:any) => {
  return (
    <div key={movie.id} className="min-w-[150px]">
      <Link href={`/movies/${movie.id}`}>
     
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={150}
            height={225}
            className="rounded-lg cursor-pointer"
          />
   
      </Link>
      <h3 className="text-sm mt-2">{movie.title}</h3>
    </div>
  );
};

export default MovieComponent;
