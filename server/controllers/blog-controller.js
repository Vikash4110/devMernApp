// controllers/blog-controller.js

const Blog = require('../models/blog-model');

// Get all blogs (public)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name'); // Fetch all blogs
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all blogs for the authenticated user
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).populate('author', 'name');
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content, authorName } = req.body;
  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user._id,
      authorName, // Save the author's name
    });
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (err) {
    console.error('Error creating blog:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  const { title, content, authorName } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check if the user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    blog.title = title;
    blog.content = content;
    blog.authorName = authorName;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    console.error('Error updating blog:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check if the user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Blog.deleteOne({ _id: req.params.id });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllBlogs,
  getMyBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
