import React, { useEffect, useState } from "react";
import axios from "axios";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionList from "./SubscriptionList";

export default function Dashboard({ user, onLogout }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.warn("No token found, redirecting to login.");
      onLogout();
      return;
    }

    const fetchSubs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subscriptions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched subscriptions:", res.data);
        setSubscriptions(res.data);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
          onLogout();
        } else {
          alert("Error fetching subscriptions. Please try again.");
        }
      }
    };

    fetchSubs();
  }, [token]);

  const addSubscription = (sub) => setSubscriptions([...subscriptions, sub]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Hello, <span>{user?.name || "User"}</span> 👋</h2>
        <p className="dashboard-subtitle">Manage your subscriptions effortlessly</p>
      </header>

      <div className="dashboard-controls">
        <button
          className={`toggle-btn ${showForm ? "close" : "add"}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? " Close Form" : "+ Add Subscription"}
        </button>
      </div>

      {showForm && <SubscriptionForm onAdd={addSubscription} />}
      <SubscriptionList subscriptions={subscriptions} />
    </div>
  );
}
