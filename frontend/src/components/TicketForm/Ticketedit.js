import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ticketService from '../../services/ticketService'; // Import the ticket service
import './tikedit.css'; // Import the CSS file

const TicketForm = () => {
    const { id } = useParams(); // Get id from URL params
    const [type, setType] = useState('');

    useEffect(() => {
        console.log('Ticket ID:', id); // Debugging
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('type', type);
        console.log(formData)

        try {
            // Update the ticket
            await ticketService.updateTicket(id, formData);
            // Optionally handle success, e.g., show a success message
            alert('Ticket updated successfully!');
            // Close the modal or perform any other action
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error updating ticket:', error);
            alert('Failed to update ticket.');
        }
    };

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
                <Button color="secondary" style={{ marginLeft: '10px' }}  className="mt-3">
                    Close
                </Button>
            </Form>
        </div>
    );
};

export default TicketForm;
