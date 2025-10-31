import { useEffect, useState } from 'react';
// Make sure these imports are correct
import { getSubscriptions, deleteSubscription } from '../api/subscriptions'; 
import SubscriptionForm from './SubscriptionForm';

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const today = new Date();

  const fetchSubs = async () => {
    try {
      const data = await getSubscriptions();
      // Add this log to see what you get from the DB
      console.log("Fetched subscriptions:", data); 
      setSubscriptions(data.map(s => ({ ...s, dueDate: new Date(s.dueDate) })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const handleAdded = (newSub) => {
    // This 'newSub' comes from the POST response
    console.log("Added new sub:", newSub);
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

  // This is the function that calls your new backend route
  const handleViewCredentials = async (sub) => {
    try {
      // Make sure this API path is correct
      const res = await fetch(`/api/subscriptions/${sub._id}/credentials`);
      
      if (!res.ok) throw new Error('Failed to fetch credentials');
      
      const creds = await res.json(); 

      alert(
        `Credentials for ${sub.name}:\n\n` +
        `Username: ${creds.username || 'N/A'}\n` +
        `Password: ${creds.password || 'N/A'}`
      );
    } catch (err) {
      console.error(err);
      alert('Could not retrieve credentials.');
    }
  };

  return (
    <section className="subscriptions">
      <h2>Your Subscriptions</h2>
      <SubscriptionForm onAdded={handleAdded} />

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
                  <div className="card-actions">
                    {/* --- THIS IS THE KEY ---
                      This button only appears if s.username has a value */}
                    {s.username && (
                      <button className="view-creds-btn" onClick={() => handleViewCredentials(s)}>
                        View Credentials
                      </button>
                    )}
                    <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}