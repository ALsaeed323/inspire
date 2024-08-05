import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ticketService from '../../services/ticketService';
import { useAuth } from "../../context/AuthContext";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const togglee = () => setModal(prev => !prev);

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

  const handleEdit = (ticketId) => {
    navigate(`/dashboard/ticketedit/${ticketId}`);
    
  };

  const handleDelete = (ticketId) => {
    navigate(`/delete/${ticketId}`);
  };

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
              <td>
                <Button className="btn" color="success" onClick={() => handleEdit(ticket._id)}> Edit </Button>
                <Button className="btn" color="danger"  style={{ marginLeft: '10px' }} onClick={() => handleDelete(ticket._id)}> Delete </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TicketList;
