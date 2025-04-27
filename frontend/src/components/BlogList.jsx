import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const blogsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/blogs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          }
        });
        setBlogs(response.data.blogs || []); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blogs.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="blog-list-container">
      <h1>My Blogs</h1>

      <input
        type="text"
        placeholder="Search by title or category..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset page on search
        }}
        className="search-input"
      />

      <div className="blogs-grid">
        {currentBlogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <img src={blog.blog_image_url} alt={blog.title} className="blog-image" />
            <div className="blog-details">
              <span className="blog-category">{blog.category_name}</span>
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-content">{blog.content}</p>
              <small className="blog-date">Published on {new Date(blog.createdAt).toDateString()}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <style jsx>{`
        .blog-list-container {
          padding: 2rem;
          max-width: 1200px;
          margin: auto;
        }
        .search-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 2rem;
          font-size: 1rem;
        }
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .blog-card {
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .blog-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .blog-details {
          padding: 1rem;
        }
        .blog-category {
          font-size: 0.8rem;
          color: #0070f3;
          text-transform: uppercase;
          font-weight: bold;
        }
        .blog-title {
          margin: 0.5rem 0;
          font-size: 1.25rem;
        }
        .blog-content {
          font-size: 0.9rem;
          color: #555;
        }
        .blog-date {
          display: block;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: #aaa;
        }
        .pagination-controls {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
        .pagination-controls button {
          padding: 8px 16px;
          font-size: 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .pagination-controls button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default BlogList;