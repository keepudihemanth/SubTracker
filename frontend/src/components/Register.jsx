import React, { useState } from "react";
import axios from "axios";

export default function Register({ onRegisterSuccess, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onRegisterSuccess(res.data.user, res.data.token);
    } catch (err) {
      console.error("Register error:", err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Your Account </h2>
        <p className="register-subtitle">
          Start tracking your subscriptions in seconds
        </p>

        <form onSubmit={handleRegister} className="register-form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
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

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <button className="login-link" onClick={goToLogin}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
