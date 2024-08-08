import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert, Button } from 'reactstrap';
import ticketService from '../../services/ticketService';
import { useAuth } from "../../context/AuthContext";
import Ticketedit from '../../components/TicketForm/Ticketedit';
import './ticketlist.css';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Renamed to modalOpen for clarity
  const { user } = useAuth();

  const toggleModal = () => setModalOpen(prev => !prev);

  const fetchTickets = async () => {
    try {
      console.log('User role:', user.role);
      let data;
      if (user.role === 'admin') {
        console.log('Fetching all tickets for admin');
        data = await ticketService.getAllTickets();
      } else if (user.role === 'hr') {
        console.log('Fetching HR tickets');
        data = await ticketService.getHRTickets();
      } else if (user.role === 'administrative') {
        console.log('Fetching administrative tickets');
        data = await ticketService.getAdministrativeTickets();
      }
      setTickets(data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Error fetching tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTickets();
    } else {
      console.error('User is not defined');
    }
  }, [user]);

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    toggleModal();
  };

  const handleModalClose = () => {
    setSelectedTicket(null);
    toggleModal();
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert color="danger">{error}</Alert>;

  return (
    <Container>
      <h1>Tickets</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Service</th>
            <th>Description</th>
            <th>Status</th>
            <th>Type</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id}>
              <td>{index + 1}</td>
              <td>{ticket.service}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.type}</td>
              <td>{ticket.comment}</td>
              <td>
                <Button className="btn" color="success" onClick={() => handleEdit(ticket)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {modalOpen && selectedTicket && (
        <div className="ticket-edit-modal">
          <Ticketedit 
            show={modalOpen} 
            onClose={handleModalClose} 
            ticket={selectedTicket} 
            onEditSuccess={() => {
              fetchTickets(); // Re-fetch tickets after edit
              handleModalClose();
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default TicketList;
