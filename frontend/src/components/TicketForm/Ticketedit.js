import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import ticketService from '../../services/ticketService';
import userService from '../../services/userService';
import './tikedit.css'; // Import the CSS file

const TicketForm = ({ show, onClose, ticket }) => {
    const [type, setType] = useState(ticket.type || '');
    const [status, setStatus] = useState(ticket.status || 'pending');
    const [comment, setComment] = useState(ticket.comment || '');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(ticket.user || '');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (ticket) {
            setType(ticket.type);
            setStatus(ticket.status);
            setComment(ticket.comment);
            setSelectedUser(ticket.user);
        }
    }, [ticket]);

    useEffect(() => {
        if (type) {
            fetchUsers();
        }
    }, [type]);

    const fetchUsers = async () => {
        try {
            let data = [];
            if (type === 'HR Support') {
                console.log('Fetching HR users');
                data = await userService.getHR();
            } else if (type === 'Administrative Support') {
                console.log('Fetching administrative users');
                data = await userService.getAdministrative();
            } else if (type === 'Other Support') {
                console.log('Fetching other support users');
                data = await userService.getOtherSupport(); // Assuming you have a service for this
            }
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = {
            type,
            status,
            comment,
            user: selectedUser,
        };

        try {
            // Update the ticket
            await ticketService.updateTicket(ticket._id, formData);
            setSuccessMessage('Ticket updated successfully!');
            setErrorMessage('');

            // Delay closing the modal to allow the success message to be visible
            setTimeout(() => {
                onClose();
            }, 2000); // Adjust the timeout duration as needed
        } catch (error) {
            console.error('Error updating ticket:', error);
            setErrorMessage('Failed to update ticket.');
            setSuccessMessage('');
        }
    };

    if (!show) return null; // Render nothing if the modal is not shown

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} className="ticket-form">
                {successMessage && <Alert color="success">{successMessage}</Alert>}
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

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

                <FormGroup>
                    <Label for="formStatus">Status *</Label>
                    <Input
                        type="select"
                        id="formStatus"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="under handling">Under Handling</option>
                        <option value="closed">Closed</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="formComment">Comment</Label>
                    <Input
                        type="textarea"
                        id="formComment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength="250"
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="formUser">Assigned Users *</Label>
                    <Input
                        type="select"
                        id="formUser"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        required
                    >
                        <option value="">Select User</option>
                        {users.map((user, index) => (
                            <option key={index} value={user._id}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
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
