import React from "react";
import heroImg from "../assets/hero-image.png"; 

export default function Hero({ onStartNow }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-text">
        <h1>Track all your subscriptions with ease</h1>
        <p>
          Manage everything in one place. Get reminders before dues, and never
          lose track of payments again.
        </p>
        <div className="hero-actions">
          <button onClick={onStartNow}>Start Now</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="Subscriptions" />
      </div>
    </section>
  );
}
