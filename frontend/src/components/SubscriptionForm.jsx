import { useState } from "react";
import { createSubscription } from "../api/subscriptions";
import "./SubscriptionForm.css"; // ✅ new CSS file

export default function SubscriptionForm({ onAdded }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !amount || !dueDate) return;

    const newSub = {
      name,
      amount: parseFloat(amount),
      billingCycle,
      dueDate,
      notes,
    };

    try {
      const createdSub = await createSubscription(newSub);

      if (onAdded) {
        onAdded({ ...createdSub, dueDate: new Date(createdSub.dueDate) });
      }

      // Reset form
      setName("");
      setAmount("");
      setBillingCycle("monthly");
      setDueDate("");
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Failed to add subscription");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="subscription-form">
      <h2>Add a New Subscription</h2>
      <input
        type="text"
        placeholder="Subscription Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select
        value={billingCycle}
        onChange={(e) => setBillingCycle(e.target.value)}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">+ Add Subscription</button>
    </form>
  );
}
