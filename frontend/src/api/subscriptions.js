// src/api/subscriptions.js
const API_BASE = "http://localhost:5000/api/subscriptions"; // adjust if backend runs elsewhere

//  Helper to get the token
function getToken() {
  return localStorage.getItem("token");
}

//  Get all subscriptions for the logged-in user
export async function getSubscriptions() {
  const token = getToken();
  const res = await fetch(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch subscriptions");
  return res.json();
}

//  Add a new subscription
export async function addSubscription(subData) {
  const token = getToken();
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subData),
  });
  if (!res.ok) throw new Error("Failed to add subscription");
  return res.json();
}

//  Delete subscription
export async function deleteSubscription(id) {
  const token = getToken();
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete subscription");
  return res.json();
}
