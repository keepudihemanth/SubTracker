import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DashboardLanding from "./components/DashboardLanding";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const onAuthSuccess = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar onStartNow={() => navigate("/login")} goHome={() => navigate("/")} goAbout={() => navigate("/about")} onLogout={handleLogout} isLoggedIn={!!user} />

      <Routes>
        <Route path="/" element={<><Hero onStartNow={() => navigate("/login")} /><DashboardLanding onStartNow={() => navigate("/login")} /><Footer /></>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={ user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={(u, t) => onAuthSuccess(u, t)} goToRegister={() => navigate('/register')} /> } />
        <Route path="/register" element={ user ? <Navigate to="/dashboard" /> : <Register onRegisterSuccess={(u, t) => onAuthSuccess(u, t)} goToLogin={() => navigate('/login')} /> } />
        <Route path="/dashboard" element={ user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" /> } />
      </Routes>
    </>
  );
}
