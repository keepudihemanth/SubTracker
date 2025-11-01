import React, { useState } from "react";
import axios from "axios";

export default function SubscriptionForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    dueDate: "",
    billingCycle: "monthly",
    notes: "",
    username: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login required");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/subscriptions",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onAdd(res.data);
      setForm({
        name: "",
        amount: "",
        dueDate: "",
        billingCycle: "monthly",
        notes: "",
        username: "",
        password: "",
      });
    } catch (err) {
      console.error("Add subscription error:", err);
      alert(err.response?.data?.message || "Failed to add subscription");
    }
  };

  return (
    <div className="subscription-form-container">
      <h2 className="form-title">Add New Subscription</h2>
      <form className="subscription-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Service Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., Netflix, Spotify"
            required
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g., 299"
            required
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Billing Cycle</label>
          <select
            name="billingCycle"
            value={form.billingCycle}
            onChange={handleChange}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="form-group">
          <label>Username (optional)</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter login username"
          />
        </div>

        <div className="form-group">
          <label>Password (optional)</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter login password"
          />
        </div>

        <div className="form-group full-width">
          <label>Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add any extra info..."
          />
        </div>

        <button type="submit" className="submit-btn">
          + Add Subscription
        </button>
      </form>
    </div>
  );
}
