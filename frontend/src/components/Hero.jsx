import React from "react";
import "../index.css";
import heroImage from "../assets/hero-img.png"; 

export default function Hero({ onStartNow }) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(40, 0, 70, 0.6), rgba(40, 0, 70, 0.6)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-content">
        <h1>Track all your subscriptions with ease</h1>
        <p>
          Manage everything in one place. Get reminders before dues, and never lose
          track of payments again.
        </p>
        <button onClick={onStartNow}>Get Started</button>
      </div>
    </section>
  );
}
