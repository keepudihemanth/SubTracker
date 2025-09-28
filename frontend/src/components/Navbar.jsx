import React from "react";

export default function Navbar({ onStartNow, goHome, goAbout }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/" onClick={(e) => { e.preventDefault(); goHome(); }}>
          SubTracker
        </a>
      </div>
      <ul>
        
        <li>
          <a href="#about" onClick={(e) => { e.preventDefault(); goAbout(); }}>About</a>
        </li>
      </ul>
      <button onClick={onStartNow}>Start Now</button>
    </nav>
  );
}
