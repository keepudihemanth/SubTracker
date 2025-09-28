import React, { useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionList from "./SubscriptionList";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addSubscription = (sub) => {
    setSubscriptions([...subscriptions, sub]);
    setShowForm(false); // close modal after adding
  };

  return (
    <div className="dashboard" id="dashboard">
      {/* Hero / Cool section */}
      <header style={heroStyle}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Welcome to SubTrack</h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Track all your subscriptions easily and never miss a payment.
        </p>
      </header>

      {/* Interactive Features Section */}
      <section style={featuresContainerStyle}>
        <FeatureCard title=" Insights" description="View spending trends and subscription summaries at a glance." bgColor="#8e44ad" />
        <FeatureCard title=" Reminders" description="Never miss a payment with smart notifications." bgColor="#e67e22" />
        <FeatureCard title=" Secure" description="Your data is safe and encrypted." bgColor="#27ae60" />
      </section>

      {/* Subscription Cards fetched from backend */}
      <SubscriptionList subscriptions={subscriptions} />

      {/* Modal for Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowForm(false)}>✖</button>
            <SubscriptionForm addSubscription={addSubscription} />
          </div>
        </div>
      )}
    </div>
  );
}

// Feature Card Component
function FeatureCard({ title, description, bgColor }) {
  return (
    <div
      className="feature-card"
      style={{ ...featureStyle, background: bgColor }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Inline Styles
const heroStyle = {
  textAlign: "center",
  padding: "2rem 1rem",
  background: "#f0f4f8",
  borderRadius: "12px",
  marginBottom: "2rem",
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.8rem 1.8rem",
  background: "#3498db",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
};

const featuresContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gap: "1rem",
  marginBottom: "2rem",
};

const featureStyle = {
  color: "#fff",
  borderRadius: "12px",
  padding: "1.5rem",
  width: "220px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

// Hover effect using inline style trick
if (typeof window !== "undefined") {
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    .feature-card:hover {
      transform: translateY(-8px) scale(1.05);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      opacity: 0.95;
    }
  `, styleSheet.cssRules.length);
}
