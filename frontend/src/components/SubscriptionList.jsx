import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubscriptionList() {
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");

  const fetch = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/subscriptions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setList(res.data);
    } catch (err) {
      console.error("Failed to fetch subscriptions", err);
      alert(err.response?.data?.message || "Failed to fetch subscriptions");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const viewCreds = async (id, name) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/subscriptions/${id}/credentials`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(
        `Credentials for ${name}:\nUsername: ${
          res.data.username || "N/A"
        }\nPassword: ${res.data.password || "N/A"}`
      );
    } catch (err) {
      console.error("Get creds error", err);
      alert(err.response?.data?.message || "Failed to get credentials");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete subscription?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/subscriptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setList(list.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="subscriptions-container">
      <h2 className="subscriptions-title">Your Subscriptions</h2>

      {list.length === 0 ? (
        <p className="empty-message">You don’t have any subscriptions yet.</p>
      ) : (
        <div className="subscriptions-grid">
          {list.map((s) => (
            <div key={s._id} className="subscription-card">
              <div className="subscription-header">
                <h3>{s.name}</h3>
                <p className="amount">${Number(s.amount).toFixed(2)}</p>
              </div>
              <p className="due-date">
                Next renewal:{" "}
                <strong>{new Date(s.dueDate).toDateString()}</strong>
              </p>
              <div className="actions">
                {s.username && (
                  <button
                    className="view-btn"
                    onClick={() => viewCreds(s._id, s.name)}
                  >
                    View Credentials
                  </button>
                )}
                <button className="delete-btn" onClick={() => remove(s._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
