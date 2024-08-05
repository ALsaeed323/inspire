import Ticket from '../models/ticketModel.js';

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { type, service, severity, description } = req.body;
    const attachment = req.file ? req.file.path : null; // Handle file upload

    const newTicket = new Ticket({ type, service, severity, attachment, description });
    await newTicket.save();

    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
};

// Get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

// Get a single ticket
export const getHRTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({ type: 'HR Support' }); // i want to fetch  ticket that have type 'HR Support'
    if (tickets.length === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error });
  }
};

export const getAdministrativeTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({ type: 'Administrative Support' }); //  i want to fetch  ticket that have type: 'Administrative Support' }
    console.log(tickets);
    if (tickets.length === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error });
  }
};

export const updateTicket = async (req, res) => {
  try {
    // Fetch the existing ticket
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }


    // Update only the fields provided in req.body
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        ticket[key] = req.body[key];
      }
    });


    // Save the updated ticket
    const updatedTicket = await ticket.save();
    
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error });
  }
};



// Delete a ticket
export const deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error });
  }
};
