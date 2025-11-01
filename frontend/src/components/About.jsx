import React from "react";

export default function About() {
  return (
    <section className="about-page">
      <div className="about-container">
        <h1 className="about-title">About SubTracker</h1>
        <p className="about-intro">
          SubTracker is your personal assistant for managing all your online
          subscriptions — from streaming services to productivity apps. It helps
          you track costs, monitor renewals, and stay in control of your
          spending with ease.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>Track Your Subscriptions</h3>
            <p>
              Add all your subscriptions in one place and get a clear overview
              of how much you spend monthly and yearly.
            </p>
          </div>
          <div className="about-card">
            <h3>Renewal Reminders</h3>
            <p>
              Never miss a payment! Get alerts for upcoming renewals so you can
              decide whether to continue or cancel before charges occur.
            </p>
          </div>
          <div className="about-card">
            <h3>Smart Budgeting</h3>
            <p>
              SubTracker calculates your total expenses and helps you understand
              where your money goes — so you can plan better.
            </p>
          </div>
          <div className="about-card">
            <h3>Easy to Use</h3>
            <p>
              A clean and simple interface makes adding, editing, and viewing
              subscriptions fast and hassle-free.
            </p>
          </div>
        </div>

        <div className="about-footer">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <p>
                Click <strong>+ Add Subscription</strong> to add your services.
              </p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <p>Enter the name, cost, and renewal date.</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <p>View your total expenses and upcoming renewals instantly.</p>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <p>Stay in control of your subscriptions at all times!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
