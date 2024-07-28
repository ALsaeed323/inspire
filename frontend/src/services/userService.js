// src/services/userService.js
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

export default {
  signup,
  login,
};
