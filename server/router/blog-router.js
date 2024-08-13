// routes/blog-router.js

const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();
const blogController = require('../controllers/blog-controller');



// Get all blogs (public)
router.get('/', blogController.getAllBlogs);

// Get all blogs for the authenticated user
router.get('/my-blogs', authMiddleware, blogController.getMyBlogs);

// Get a single blog by ID
router.get('/:id', blogController.getBlogById);

// Create a new blog
router.post('/add', authMiddleware, blogController.createBlog);

// Update a blog
router.put('/:id', authMiddleware, blogController.updateBlog);

// Delete a blog
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
