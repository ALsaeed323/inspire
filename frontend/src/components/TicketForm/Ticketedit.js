// src/components/TicketForm/Ticketedit.js
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ticketService from '../../services/ticketService';
import './tikedit.css'; // Import the CSS file

const TicketForm = ({ show, onClose, ticket }) => {
    const [type, setType] = useState(ticket.type || '');

    useEffect(() => {
        if (ticket) {
            setType(ticket.type);
        }
    }, [ticket]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('type', type);

        try {
            // Update the ticket
            await ticketService.updateTicket(ticket._id, formData);
            // Optionally handle success, e.g., show a success message
            alert('Ticket updated successfully!');
            onClose(); // Close the modal after successful update
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error updating ticket:', error);
            alert('Failed to update ticket.');
        }
    };

    if (!show) return null; // Render nothing if the modal is not shown

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} className="ticket-form">
                <FormGroup>
                    <Label for="formType">Type *</Label>
                    <Input
                        type="select"
                        id="formType"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="HR Support">HR Support</option>
                        <option value="Administrative Support">Administrative Support</option>
                        <option value="Other Support">Other Support</option>
                    </Input>
                </FormGroup>
                <Button color="success" type="submit" className="mt-3">
                    Submit
                </Button>
                <Button color="secondary" style={{ marginLeft: '10px' }} onClick={onClose} className="mt-3">
                    Close
                </Button>
            </Form>
        </div>
    );
};

export default TicketForm;
