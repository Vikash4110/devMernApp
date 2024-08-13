import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../store/auth";
import './Navbar.css';
import '../index.css';

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navbarClass = 'bg-white'; // Set the navbar color to white

  return (
    <nav className={`fixed top-0 w-full z-50 p-4 transition-colors duration-300 ${navbarClass}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-black text-xl font-bold">
          VikashBharal
        </Link>
        <div className="hidden md:flex flex-grow justify-center items-center space-x-8">
          <Link to="/about" className="font-bold text-sm md:text-base hover:text-blue-700 transition-colors duration-300">About Us</Link>
          <Link to="/service" className="font-bold text-sm md:text-base hover:text-blue-700 transition-colors duration-300">Services</Link>
          <Link to="/contact" className="font-bold text-sm md:text-base hover:text-blue-700 transition-colors duration-300">Contact Us</Link>
          <Link to="/blogs" className="font-bold text-sm md:text-base hover:text-blue-700 transition-colors duration-300">Ptu Blogs</Link>
          <Link to="/my-blogs" className="font-bold text-sm md:text-base hover:text-blue-700 transition-colors duration-300">My Blogs</Link>

        </div>
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="bg-yellow-500 text-white font-bold text-sm md:text-base px-2 py-1 rounded hover:bg-yellow-700 transition-colors duration-300 transform hover:scale-105">Dashboard</Link>
              <Link to="/logout" className="bg-red-500 text-white font-bold text-sm md:text-base px-2 py-1 rounded hover:bg-red-700 transition-colors duration-300 transform hover:scale-105">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-green-500 text-white font-bold text-sm md:text-base px-2 py-1 rounded hover:bg-green-700 transition-colors duration-300 transform hover:scale-105">Login</Link>
              <Link to="/register" className="bg-blue-500 text-white font-bold text-sm md:text-base px-2 py-1 rounded hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">Register</Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/about" className="block font-bold text-sm hover:text-blue-700 transition-colors duration-300" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/service" className="block font-bold text-sm hover:text-blue-700 transition-colors duration-300" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/contact" className="block font-bold text-sm hover:text-blue-700 transition-colors duration-300" onClick={() => setIsOpen(false)}>Contact Us</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block bg-yellow-500 text-white font-bold text-sm w-28 px-2 py-1 rounded hover:bg-yellow-700 transition-colors duration-300 transform hover:scale-105" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link to="/logout" className="block font-bold text-sm hover:text-blue-700 transition-colors duration-300" onClick={() => setIsOpen(false)}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="block bg-green-500 text-white font-bold text-sm w-28 px-2 py-1 rounded hover:bg-green-700 transition-colors duration-300 transform hover:scale-105" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="block bg-blue-500 text-white font-bold text-sm w-28 px-2 py-1 rounded hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
