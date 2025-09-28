import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem('token', res.data.token);
  return res.data.user;
};

export const register = async (name, email, password) => {
  const res = await axios.post(`${API_URL}/register`, { name, email, password });
  localStorage.setItem('token', res.data.token);
  return res.data.user;
};
