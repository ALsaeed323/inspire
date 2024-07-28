// frontend/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/signup';

const signup = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export default {
  signup,
};
