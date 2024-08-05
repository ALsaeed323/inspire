// frontend/services/ticketService.mjs

import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // Adjust the API URL as needed

// Create a new ticket
const createTicket = async (ticketData) => {
  const response = await axios.post(`${API_URL}/ticket`, ticketData);
  return response.data;
};

// Get all tickets
const getAllTickets = async () => {
  const response = await axios.get(`${API_URL}/tickets`);
  return response.data;
};
const getHRTickets = async () => {
  const response = await axios.get(`${API_URL}/tickets/hr`);
  return response.data;
};

const getAdministrativeTickets = async () => {
  const response = await axios.get(`${API_URL}/tickets/administrative`);
  return response.data;
};

// Get a single ticket by ID
const getTicket = async (id) => {
  const response = await axios.get(`${API_URL}/ticket/${id}`);
  return response.data;
};

// Update a ticket by ID
const updateTicket = async (id, ticketData) => {
  console.log('Data being sent:', ticketData);
  const response = await axios.put(`${API_URL}/ticketedit/${id}`, ticketData);
  return response.data;
};

// Delete a ticket by ID
const deleteTicket = async (id) => {
  const response = await axios.delete(`${API_URL}/ticket/${id}`);
  return response.data;
};

export default {
  createTicket,
  getAllTickets,
  getTicket,
  getHRTickets,
  getAdministrativeTickets,
  updateTicket,
  deleteTicket,
};
