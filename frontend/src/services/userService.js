// frontend/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000';

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/signin`, userData);
  return response.data;
};
const getHR = async () => {
  const response = await axios.get(`${API_URL}/hr`);
  return response.data;
};

const getAdministrative = async () => {
  const response = await axios.get(`${API_URL}/administrative`);
  return response.data;
};
const logout = async (user) => {
  try {
    console.log(user);
    const response = await axios.post(`${API_URL}/logout`, user );
    return response.data;
  } catch (error) {
    console.error('Logout request failed:', error);
    throw error;
  }
};

export default {
  signup,
  login,
  logout,
  getHR,
  getAdministrative,
};
