import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Register.css';

function Register() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await API.post('/auth/register', { username: fullName, email, password });
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      {/* Left Side */}
      <div className="form-section">
        <div className="form-container">
          <h2 className="signup-title">Sign Up</h2>
          <p className="signup-subtitle">Join the Conversation. Sign up to share and explore insightful blogs.</p>
          <form onSubmit={handleRegister}>
            <div className="form-group mb-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control custom-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control custom-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control custom-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control custom-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control custom-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </div>
            <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary w-100 rounded-pill" style={{ backgroundColor: "#6840c6", border: "none", fontFamily: "Inter, Helvetica", fontWeight: 600, fontSize: "1.125rem" }}>
                  Sign In
                </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p className="small-text">
              Already have an account? <a href="/" className="text-dark fw-medium text-decoration-none">Sign In</a>
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
  );
}

export default Register;
