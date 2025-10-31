// src/components/SubscriptionForm.jsx
import React, { useState } from "react";

export default function SubscriptionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    dueDate: "",
    billingCycle: "monthly",
    notes: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user?._id) {
      alert("❌ Please login before adding a subscription!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          userId: user._id, // ✅ send userId to backend
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Add subscription error:", data);
        alert(`❌ Failed to add subscription: ${data.message || "Unknown error"}`);
        return;
      }

      alert("✅ Subscription added successfully!");
      onAdd && onAdd(data);

      // Reset form
      setFormData({
        name: "",
        amount: "",
        dueDate: "",
        billingCycle: "monthly",
        notes: "",
        username: "",
        password: "",
      });
    } catch (err) {
      console.error("Network or server error:", err);
      alert("⚠️ Could not connect to the backend server.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="subscription-form">
      <h2>Add New Subscription</h2>

      <input
        type="text"
        name="name"
        placeholder="Service Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      />

      <select
        name="billingCycle"
        value={formData.billingCycle}
        onChange={handleChange}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <input
        type="text"
        name="username"
        placeholder="Username (optional)"
        value={formData.username}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password (optional)"
        value={formData.password}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <button type="submit">Add Subscription</button>
    </form>
  );
}
