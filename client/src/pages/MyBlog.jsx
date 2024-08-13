import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEdit, FaPen, FaTrash } from 'react-icons/fa'; // Import user and action icons
import { toast } from "react-toastify";


const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/blogs/my-blogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err.response ? err.response.data : err.message);
      }
    };

    fetchMyBlogs();
  }, [token]);

  const handleDelete = async (id) => {
      try {
        await axios.delete(`${backendUrl}/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Blog Deleted Successfully");
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } catch (err) {
        toast.success("Failed to delete blog");
        console.error('Failed to delete blog:', err.response ? err.response.data : err.message);
      }
    
  };

  const handleEdit = (id) => {
    navigate(`/my-blogs/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/blogs/${id}`);
  };

  const handleCompose = () => {
    navigate('/compose-blog');
  };

  return (
    <>
    <br /><br />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">My Blogs</h1>
        <button onClick={handleCompose} className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        <FaPen className="mr-2" />Compose Blog
        </button>
<br />
        {blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs found. Please compose a blog.</p>
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
              <div className="flex justify-end mt-4">
                <button onClick={() => handleView(blog._id)} className="flex items-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mr-2">
                  <FaEye className="mr-1" /> View
                </button>
                <button onClick={() => handleEdit(blog._id)} className="flex items-center bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors duration-300 mr-2">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button onClick={() => handleDelete(blog._id)} className="flex items-center bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default MyBlog;
