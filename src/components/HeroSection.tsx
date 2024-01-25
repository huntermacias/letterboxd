'use client'

import React, { useState } from 'react';
import Image from 'next/image';


const HeroImage = ({ movie, trailerKey }: {movie:any, trailerKey: any}) => {
    const [isTrailerModalOpen, setTrailerModalOpen] = useState(false);
	
	
	  // Function to open the trailer modal
	  const openTrailerModal = () => {
		setTrailerModalOpen(true);
	  };
	
	  // Function to close the trailer modal
	  const closeTrailerModal = () => {
		setTrailerModalOpen(false);
	  };


	return (
		<div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie?.title ?? "Movie"} backdrop`}
          layout="responsive"
          width={700}
          height={293}
          className="rounded-t-lg object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
        <button
          onClick={openTrailerModal}
          className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm font-medium shadow"
        >
          Watch Trailer
        </button>
        {isTrailerModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
            <div className="bg-gray-800 p-4 rounded-lg max-w-xl mx-auto">
              <iframe
                title="Movie Trailer"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full md:h-96"
              ></iframe>
              <button
                onClick={closeTrailerModal}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
  );
};

export default HeroImage;
