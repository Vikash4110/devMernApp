import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Importing Framer Motion for animations
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'; // Importing icons

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const { authorizationToken } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/auth/user`, {
          method: 'GET',
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data.userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [authorizationToken, backendUrl]);

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <motion.div 
          className="bg-white shadow-lg rounded-lg p-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-semibold text-center text-gray-800">User Dashboard</h1>
          <p className="text-center text-gray-600 mt-2">Welcome back, {userData.username}!</p>
        </motion.div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Profile Information</h2>
          <div className="flex flex-col items-center"> {/* Centering the details */}
            <motion.div 
              className="bg-blue-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 mb-4 flex items-center w-full max-w-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaUser className="text-blue-600 mr-2" />
              <div className="flex-grow text-left">
                <p className="font-semibold text-gray-700">Name:</p>
                <p className="text-gray-600">{userData.username}</p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-green-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 mb-4 flex items-center w-full max-w-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaEnvelope className="text-green-600 mr-2" />
              <div className="flex-grow text-left">
                <p className="font-semibold text-gray-700">Email:</p>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-yellow-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 mb-4 flex items-center w-full max-w-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaPhone className="text-yellow-600 mr-2" />
              <div className="flex-grow text-left">
                <p className="font-semibold text-gray-700">Phone:</p>
                <p className="text-gray-600">{userData.phone}</p>
              </div>
            </motion.div>
            {/* Add more fields as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
