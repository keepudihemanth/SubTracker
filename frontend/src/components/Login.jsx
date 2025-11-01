import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess, goToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onLoginSuccess(res.data.user, res.data.token);
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Log in to manage your subscriptions</p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <button className="register-link" onClick={goToRegister}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
