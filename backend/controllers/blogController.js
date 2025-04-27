const Blog = require('../models/blog');

exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Blog.find({ author: req.user.id });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};