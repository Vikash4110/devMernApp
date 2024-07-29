import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const Error = () => {
  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4 animate-pulse">
            404
          </h2>
          <h4 className="text-2xl text-gray-800 mb-4">Sorry! Page Not Found</h4>
          <p className="text-gray-600 mb-6">
            Oops! It seems like the page you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Return Home
            </Link>
            <Link
              to="/contact"
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
            >
              Report Problem
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Error;
