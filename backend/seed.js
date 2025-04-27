const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('./models/category');
const Blog = require('./models/blog');
const User = require('./models/user');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to DB');

    // Clear existing data
    await Category.deleteMany();
    await Blog.deleteMany();

    // Create a user for blog authorship
    let user = await User.findOne({ email: "test@example.com" });
    if (!user) {
        user = new User({
            name: "Test User",
            email: "test@example.com",
            password: "password123"
        });
        await user.save();
    }

    // Categories
    const categories = await Category.insertMany([
        { name: 'Technology' },
        { name: 'Health' },
        { name: 'Travel' },
    ]);

    // Blog posts
    await Blog.insertMany([
        {
            title: 'Exploring Angular 17',
            blog_image_url: 'https://via.placeholder.com/600x300',
            category_name: 'Technology',
            content: 'Angular 17 comes with powerful features...',
            author: user._id
        },
        {
            title: '10 Tips for Healthy Living',
            blog_image_url: 'https://via.placeholder.com/600x300',
            category_name: 'Health',
            content: 'Staying healthy is easier than you think...',
            author: user._id
        },
        {
            title: 'Top Destinations in 2025',
            blog_image_url: 'https://via.placeholder.com/600x300',
            category_name: 'Travel',
            content: 'Discover hidden gems and trending travel spots...',
            author: user._id
        }
    ]);

    console.log('Dummy data inserted!');
    mongoose.disconnect();
}).catch(err => console.log(err));