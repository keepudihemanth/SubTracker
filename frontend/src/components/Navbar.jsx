import React from "react";
import "../index.css";

export default function Navbar({ onStartNow, goHome, goAbout, onLogout, isLoggedIn }) {
  return (
    <nav className="navbar">
      <h1 onClick={goHome}>SubTracker</h1>
      <div className="nav-links">
        <button onClick={goAbout}>About</button>
        {isLoggedIn ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <button onClick={onStartNow}>Login</button>
        )}
      </div>
    </nav>
  );
}
