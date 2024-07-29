import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../store/auth";
// import changedLogo from '../assets/trimlogo.png';
import './Navbar.css';
import '../index.css';

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  console.log("login or not ", isLoggedIn);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navbarClass = 'bg-white'; // Set the navbar color to white
  const textColor = 'black'; // Text color for visibility on a white background
  const underlineColor = 'black'; // Underline color for links

  return (
    <nav className={`fixed top-0 w-full z-50 p-2 transition-colors duration-300 ${navbarClass}`} style={{ backgroundColor: 'white' }}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-black text-xl font-bold">
            VikashBharal
            {/* <img src="{getLogo()}" alt="logo" className="w-16 h-16 md:w-20 md:h-20" /> */}
          </Link>
          <div className="hidden md:flex items-center space-x-4" style={{ color: textColor, '--underline-color': underlineColor }}>
            <Link to="/about" className="underline-animation font-bold text-sm md:text-base">About Us</Link>
            <Link to="/service" className="underline-animation font-bold text-sm md:text-base">Services</Link>
            {isLoggedIn ? (
              <Link to="/logout" className="underline-animation font-bold text-sm md:text-base">Logout</Link>
            ) : (
              <>
                <Link to="/login" className="underline-animation font-bold text-sm md:text-base">Login</Link>
                <Link to="/register" className="underline-animation font-bold text-sm md:text-base">Register</Link>
              </>
            )}
          </div>
          <div className="hidden md:block">
            <button className="bg-[#0DC9C5] text-white px-3 py-2 rounded-full hover:bg-[#0DC9C1] font-medium text-sm md:text-base">
              <Link to="/contact" className="text-white">Contact</Link>
            </button>
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
          <div className="md:hidden mt-4 space-y-2" style={{ color: textColor, '--underline-color': underlineColor }}>
            <Link to="/about" className="block underline-animation font-bold text-sm" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/service" className="block underline-animation font-bold text-sm" onClick={() => setIsOpen(false)}>Services</Link>
            {isLoggedIn ? (
              <Link to="/logout" className="block underline-animation font-bold text-sm" onClick={() => setIsOpen(false)}>Logout</Link>
            ) : (
              <>
                <Link to="/login" className="block underline-animation font-bold text-sm" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="block underline-animation font-bold text-sm" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}
            <Link to="/contact" className="block underline-animation font-bold text-sm" onClick={() => setIsOpen(false)}>Contact Us</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
