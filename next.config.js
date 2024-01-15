/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  remotePatterns: [
		{
		  protocol: 'https',
		  hostname: 'image.tmdb.org',
		  // Optional: if you want to allow images from a specific path on this domain, you can use pathname
		  // pathname: '/path/to/images/*',
		},
	  ],
	},
  };
  
  module.exports = nextConfig;
  