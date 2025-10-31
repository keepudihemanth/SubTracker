import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DashboardLanding from "./components/DashboardLanding";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [showTracker, setShowTracker] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowTracker(true);
    setShowLogin(false);
  };

  return (
    <>
      <Navbar
        onStartNow={() => setShowLogin(true)}
        goHome={() => { setShowTracker(false); setShowAbout(false); setShowLogin(false); setShowRegister(false); }}
        goAbout={() => { setShowAbout(true); setShowTracker(false); setShowLogin(false); setShowRegister(false); }}
      />

      {!showTracker && !showAbout && !showLogin && !showRegister && (
        <>
          <Hero onStartNow={() => setShowLogin(true)} />
          <DashboardLanding onStartNow={() => setShowLogin(true)} />
        </>
      )}

      {showLogin && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          goToRegister={() => { setShowLogin(false); setShowRegister(true); }}
        />
      )}

      {showRegister && (
        <Register
          goToLogin={() => { setShowRegister(false); setShowLogin(true); }}
        />
      )}

      {showTracker && user && <Dashboard user={user} />}
      {showAbout && <About />}

      <Footer />
    </>
  );
}
