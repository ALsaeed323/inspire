import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert } from 'reactstrap';
import ticketService from '../../services/ticketService';
import { useAuth } from "../../context/AuthContext";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log('User role:', user.role); // Log the user role
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

    if (user) {
      fetchTickets();
    } else {
      console.error('User is not defined');
    }
  }, [user]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert color="danger">{error}</Alert>;

  return (
    <Container>
      <h1>Tickets</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id}>
              <td>{index + 1}</td>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TicketList;
