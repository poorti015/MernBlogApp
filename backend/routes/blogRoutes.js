const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getUserPosts } = require('../controllers/blogController');

router.get('/posts', authMiddleware, getUserPosts);

module.exports = router;