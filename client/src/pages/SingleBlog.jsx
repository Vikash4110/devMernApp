import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { toast } from "react-toastify";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const handleBack = () => {
    navigate('/blogs');
  };

  return (
    <>
    <br /><br /> <br />
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="relative bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">{blog.title}</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-blue-600">
            <FaUser className="mr-2 text-blue-600" />
            <span className="font-semibold text-blue-600">{blog.authorName}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2 text-gray-600" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">{blog.content}</p>
        
        {/* Back Button */}
        <button 
          onClick={handleBack} 
          className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 w-full text-center">
          <FaArrowLeft className="mr-1" /> Back
        </button>
      </div>
    </div>
    </>
  );
};

export default SingleBlog;
