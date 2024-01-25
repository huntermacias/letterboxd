/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
	  remotePatterns: [
		{
		  protocol: 'https',
		  hostname: 'image.tmdb.org',
		},
	  ],
	},
  };
  
  module.exports = nextConfig;
  