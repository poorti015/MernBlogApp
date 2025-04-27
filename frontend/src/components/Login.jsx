import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/blogs');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-white">
      <div className="row w-100" style={{ maxWidth: "1366px" }}>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card border-0 shadow-sm" style={{ maxWidth: "468px" }}>
            <div className="card-body p-5">
              <h2 className="mb-2 fw-bold" style={{ fontFamily: "Lora, Helvetica", color: "#1a1a1a" }}>Welcome Back 👋</h2>
              <p className="text-muted mb-4" style={{ fontFamily: "Inter, Helvetica", fontSize: "0.875rem",display: 'inline' }}>
                Shape Your Thoughts. Sign in to share and explore insightful blogs.
              </p>
  
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label" style={{ fontFamily: "Inter, Helvetica", color: "#1a1a1a" }}>Email</label>
                  <input type="email" className="form-control" id="email" placeholder="shalini@gmail.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label" style={{ fontFamily: "Inter, Helvetica", color: "#1a1a1a" }}>Password</label>
                  <input type="password" className="form-control" id="password"  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required />
                </div>
                <button type="submit" className="btn btn-primary w-100 rounded-pill" style={{ backgroundColor: "#6840c6", border: "none", fontFamily: "Inter, Helvetica", fontWeight: 600, fontSize: "1.125rem" }}>
                  Sign In
                </button>
              </form>
  
              <p className="text-center mt-4 mb-0" style={{ fontFamily: "Inter, Helvetica", color: "#667085", fontSize: "0.875rem" }}>
                Don't you have an account? <a href="/register" className="text-dark fw-medium text-decoration-none">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block">
          <img
            src="https://c.animaapp.com/m9zeybt3kmftj5/img/mask-group.png"
            alt="Mask group"
            className="img-fluid"
            style={{ maxHeight: "736px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
  
}

export default Login;

