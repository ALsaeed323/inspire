import React, { useEffect, useState } from 'react';
import { Spinner, Alert, Container, Table } from "reactstrap";
import ticketService from '../../services/ticketService';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketService.getAllTickets();
        setTickets(data);
      } catch (err) {
        setError('Error fetching tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

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
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id}>
              <td>{index + 1}</td>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TicketList;
