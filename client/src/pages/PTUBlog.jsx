import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUser, FaPen, FaRegNewspaper } from 'react-icons/fa'; // Importing user, pen, and newspaper icons
import { toast } from "react-toastify";


const PTUBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/blogs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });;
        setBlogs(res.data);
      } catch (err) {
        toast.error("Failed to fetch blogs");
        console.error('Failed to fetch blogs:', err.response ? err.response.data : err.message);
      }
    };

    fetchBlogs();
  }, [backendUrl]);

  return (
    <>
      <br /><br />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">PTU Blogs</h1>
          
          {/* Dynamic Buttons for Compose Blog and My Blog */}
          <div className="flex justify-center mb-8 space-x-4">
            <Link to="/compose-blog" className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              <FaPen className="mr-2" /> Compose Blog
            </Link>
            <Link to="/my-blogs" className="flex items-center bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors duration-300">
              <FaRegNewspaper className="mr-2" /> My Blog
            </Link>
          </div>

          {blogs.length === 0 ? (
            <p className="text-center text-gray-600">No blogs available.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="mb-6 p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h2 className="text-3xl font-bold text-gradient mb-2">{blog.title}</h2>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <FaUser className="text-purple-600 mr-2 text-xl" />
                    <span className="text-md font-semibold text-purple-700">{blog.authorName}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-800 mb-4">{blog.content.substring(0, 100)}...</p>
                <Link to={`/blogs/${blog._id}`} className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                  Read More
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PTUBlog;
