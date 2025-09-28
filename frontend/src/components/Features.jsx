import React from "react";

const features = [
  {
    title: "Smart Reminders",
    description:
      "Get notified before any subscription payment is due so you never miss a deadline.",
  },
  {
    title: "Centralized Dashboard",
    description:
      "Manage all your subscriptions in one place with a clear and simple overview.",
  },
  {
    title: "Expense Insights",
    description:
      "Track how much you spend monthly and yearly, helping you make smarter decisions.",
  },
  {
    title: "Easy Management",
    description:
      "Add, edit, or remove subscriptions in just a few clicks with a user-friendly interface.",
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <h2>Features</h2>
      <div className="features-grid">
        {features.map((f, index) => (
          <div className="feature-card" key={index}>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
