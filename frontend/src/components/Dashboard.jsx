import React, { useState, useEffect } from "react";
import axios from "axios";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionList from "./SubscriptionList";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch subscriptions on mount
  useEffect(() => {
    if (!token) return;

    const fetchSubs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subscriptions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubscriptions(res.data);
      } catch (err) {
        console.error("Failed to fetch subscriptions", err);
      }
    };
    fetchSubs();
  }, [token]);

  // ✅ Add subscription
  const addSubscription = async (subData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/subscriptions", subData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscriptions([...subscriptions, res.data]);
      setShowForm(false);
    } catch (err) {
      console.error("Error adding subscription", err);
    }
  };

  return (
    <div className="dashboard" id="dashboard">
      <header style={heroStyle}>
        <h1>Welcome to SubTrack</h1>
        <p>Track all your subscriptions easily and never miss a payment.</p>
        <button style={buttonStyle} onClick={() => setShowForm(true)}>Add Subscription</button>
      </header>

      <SubscriptionList subscriptions={subscriptions} />

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

// Styles
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
