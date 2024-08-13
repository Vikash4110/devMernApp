import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaUser } from 'react-icons/fa'; // Importing icons for pen and user
import { toast } from "react-toastify";


const ComposeBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/blogs/add`, { title, content, authorName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle('');
      setContent('');
      setAuthorName('');
      toast.success("Blog Created Successfully")
      navigate('/my-blogs');
    } catch (err) {
      toast.error("Failed to create blog")
      console.error('Failed to create blog:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          <FaPen className="inline-block mr-2" /> Compose a New Blog
        </h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Author Name</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaUser className="p-2 text-gray-600" />
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full p-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="5"
              required
            />
          </div>
        
          <button 
            type="submit" 
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComposeBlog;
