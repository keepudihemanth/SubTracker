import React from "react";

export default function DashboardLanding({ onStartNow }) {
  const features = [
    {
      title: "All Subscriptions in One Place",
      desc: "See all your active subscriptions at a glance and never miss one again.",
    },
    {
      title: "Smart Reminders",
      desc: "Get notified before payments are due so you’re always prepared.",
    },
    {
      title: "Expense Insights",
      desc: "Understand your monthly costs with a clear breakdown of expenses.",
    },
    {
      title: "Stop Wasting Money",
      desc: "Avoid forgotten or unused subscriptions that silently drain your wallet.",
    },
  ];

  return (
    <section className="dashboard-landing" id="dashboard-landing">
      <div className="dashboard-container">
        {/* Heading */}
        <h2 className="dashboard-heading">What is SubTracker ?</h2>
        <p className="dashboard-subtext">
          SubTracker gives you complete control of your subscriptions, bills, 
          and spending habits — all from a simple and intuitive dashboard.
        </p>

        {/* Feature Cards */}
        <div className="dashboard-features">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-placeholder"></div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="dashboard-btn" onClick={onStartNow}>
          Start Tracking Now
        </button>
      </div>
    </section>
  );
}
