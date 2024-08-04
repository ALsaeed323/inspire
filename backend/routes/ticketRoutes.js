
import express from 'express';
import multer from 'multer';
import { validateTicket } from '../middleware/validationMiddleware.js';
import * as ticketController from '../controllers/ticketController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configure file storage

// Create a new ticket
router.post('/ticket', upload.single('attachment'), validateTicket, ticketController.createTicket);

// Get all tickets
router.get('/tickets', ticketController.getAllTickets);

// Get a single ticket


// Update a ticket
router.put('/ticket/:id', validateTicket, ticketController.updateTicket);

// Delete a ticket
router.delete('/ticket/:id', ticketController.deleteTicket);

export default router;
