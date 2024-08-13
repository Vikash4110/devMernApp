import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({ title: '', content: '', authorName: '' });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(res.data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
      }
    };

    fetchBlog();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include authorName in the update
      await axios.put(`${backendUrl}/api/blogs/${id}`, {
        title: blog.title,
        content: blog.content,
        authorName: blog.authorName, // Ensure this is included
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Blog Updated Successfully")
      navigate('/my-blogs');
    } catch (err) {
      toast.error("Blog Not Updated ")
      console.error('Failed to update blog:', err);
    }
  };

  return (
    <>
    <br /><br />
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            rows="5"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Author Name</label>
          <input
            type="text"
            value={blog.authorName}
            onChange={(e) => setBlog({ ...blog, authorName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Update Blog
        </button>
      </form>
    </div>
    </>
  );
};

export default EditBlog;
