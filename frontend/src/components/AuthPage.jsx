// src/components/AuthPage.jsx
import React, { useState } from "react";
import { login, register } from "../api/auth";

export default function AuthPage({ onLoginSuccess, goHome }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Login flow
        const user = await login(form.email, form.password); // this sets localStorage token inside api/auth
        // api/auth returns user object (id, email, name)
        onLoginSuccess({ ...user, token: localStorage.getItem('token') });
      } else {
        // Register flow
        const user = await register(form.name, form.email, form.password); // sets token
        // Confirm registration to user and switch to login view:
        alert("Registration successful. Please login now.");
        setIsLogin(true);
        // optionally clear password
        setForm({ name: "", email: user.email, password: "" });
      }
    } catch (err) {
      console.error('Auth error (frontend):', err);
      const msg = err.response?.data?.message || "Request failed";
      setError(msg);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
        {!isLogin && (
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        )}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

      <div style={{ marginTop: 12 }}>
        {isLogin ? (
          <button onClick={() => setIsLogin(false)}>New user? Register</button>
        ) : (
          <button onClick={() => setIsLogin(true)}>Already have account? Login</button>
        )}
        <button onClick={goHome} style={{ marginLeft: 8 }}>Back</button>
      </div>
    </div>
  );
}
