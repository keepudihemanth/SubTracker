import axios from 'axios';

const API_URL = 'http://localhost:5000/api/subscriptions';

export const getSubscriptions = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data;
};

export const createSubscription = async (sub) => {
  const res = await axios.post(API_URL, sub, { withCredentials: true });
  return res.data;
};

export const deleteSubscription = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};
