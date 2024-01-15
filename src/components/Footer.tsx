
const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Footer Column 1 */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-4">About</h4>
            <p className="text-gray-400">
              Discover the best movies, watch trailers, read reviews, and more
              on our platform.
            </p>
          </div>

          {/* Footer Column 2 */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-red-300">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-red-300">
                  Popular Movies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-300">
                  Latest Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Column 3 */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-300">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-red-300">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-red-300">
                Instagram
              </a>
            </div>
          </div>

          {/* Footer Column 4 */}
          <div className="w-full md:w-1/4">
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <p className="text-gray-400">
              For inquiries, please email us at support@example.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Better Letterboxd. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
