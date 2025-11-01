import React from "react";

export default function DashboardLanding({ onStartNow }) {
  return (
    <section className="dashboard-landing">
      <div className="content">
        <h2>What is SubTracker?</h2>
        <p className="subtitle">
          Take control of your subscriptions effortlessly — smart reminders,
          detailed insights, and everything in one place.
        </p>

        <div className="features">
          <div className="feature-card">
            <h3> All in One Place</h3>
            <p>View and manage all your active subscriptions from a single dashboard.</p>
          </div>
          <div className="feature-card">
            <h3> Smart Reminders</h3>
            <p>Get notified before payments are due — never miss a renewal again.</p>
          </div>
          <div className="feature-card">
            <h3> Expense Insights</h3>
            <p>Visualize your monthly spending and identify where your money goes.</p>
          </div>
        </div>

        <button onClick={onStartNow} className="cta-button">
           Try Now
        </button>
      </div>
    </section>
  );
}
