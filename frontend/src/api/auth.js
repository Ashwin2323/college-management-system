import axios from 'axios';

const API_URL = '/api/auth';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};
