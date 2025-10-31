import React from "react";

export default function Navbar({ onStartNow, goHome, goAbout, goAuth, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/" onClick={(e) => { e.preventDefault(); goHome(); }}>
          SubTracker
        </a>
      </div>

      <ul>
        <li>
          <a href="#about" onClick={(e) => { e.preventDefault(); goAbout(); }}>
            About
          </a>
        </li>
      </ul>

      {user ? (
        <>
          <button onClick={onStartNow}>Dashboard</button>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <button onClick={goAuth}>Login / Register</button>
      )}
    </nav>
  );
}
