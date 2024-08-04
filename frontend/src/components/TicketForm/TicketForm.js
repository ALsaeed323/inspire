import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ticketService from '../../services/ticketService'; // Import the ticket service

export const TicketForm = ({ show, onClose }) => {
    const [type, setType] = useState('');
    const [service, setService] = useState('');
    const [severity, setSeverity] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('type', type);
        formData.append('service', service);
        formData.append('severity', severity);
        formData.append('attachment', attachment); // Use FormData to handle file uploads
        formData.append('description', description);

        try {
            // Create a new ticket
            await ticketService.createTicket(formData);
            // Optionally handle success, e.g., show a success message
            alert('Ticket submitted successfully!');
            onClose(); // Close the modal
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error submitting ticket:', error);
            alert('Failed to submit ticket.');
        }
    };

    return (
        <Modal isOpen={show} toggle={onClose}>
            <ModalHeader toggle={onClose}>Open A Ticket</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
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
                        <Label for="formService">Service *</Label>
                        <Input
                            type="select"
                            id="formService"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            required
                        >
                            <option value="">Select Service</option>
                            <option value="User Profile">User Profile</option>
                            <option value="Account Management">Account Management</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="formSeverity">Severity *</Label>
                        <Input
                            type="select"
                            id="formSeverity"
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            required
                        >
                            <option value="">Select Severity</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="formAttachment">Attachment *</Label>
                        <Input
                            type="file"
                            id="formAttachment"
                            onChange={(e) => setAttachment(e.target.files[0])}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="formDescription">Description *</Label>
                        <Input
                            type="textarea"
                            id="formDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength="250"
                            required
                        />
                        <FormText color="muted">Maximum 250 Characters</FormText>
                    </FormGroup>

                    <Button color="success" type="submit" className="mt-3">
                        Submit
                    </Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};
