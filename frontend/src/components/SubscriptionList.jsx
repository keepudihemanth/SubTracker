import { useEffect, useState } from 'react';
import { getSubscriptions, deleteSubscription } from '../api/subscriptions';
import SubscriptionForm from './SubscriptionForm';

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const today = new Date();

  // Fetch subscriptions from backend
  const fetchSubs = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data.map(s => ({ ...s, dueDate: new Date(s.dueDate) })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const handleAdded = (newSub) => {
    // Add the new subscription to the top of the list
    setSubscriptions(prev => [newSub, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubscription(id);
      setSubscriptions(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="subscriptions">
      <h2>Your Subscriptions</h2>

      {/* Subscription form */}
      <SubscriptionForm onAdded={handleAdded} />

      {/* Subscription cards */}
      {subscriptions.length === 0 ? (
        <p>No subscriptions added yet.</p>
      ) : (
        <div className="subscriptions-grid">
          {subscriptions.map(s => {
            const isDue = s.dueDate < today;
            return (
              <div key={s._id} className={`subscription-card ${isDue ? 'due' : ''}`}>
                <div className="card-header">
                  <div className="icon-circle">{s.name[0].toUpperCase()}</div>
                  <div>
                    <h3>{s.name}</h3>
                    <span className="category">General</span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="amount">${s.amount.toFixed(2)}</p>
                  <p className="date">Next billing: {s.dueDate.toDateString()}</p>
                  <p className={`status ${isDue ? 'overdue' : 'upcoming'}`}>
                    {isDue ? 'Overdue' : 'Upcoming'}
                  </p>
                  <button onClick={() => handleDelete(s._id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
