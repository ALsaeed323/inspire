import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  type: { type: String, required: true },
  service: { type: String, required: true },
  severity: { type: String, required: true },
  attachment: { type: String }, // Store file path or URL
  description: { type: String, maxlength: 250, required: true },
  comment: { type: String, maxlength: 250,default: ' ' },
  status: { type: String, default: 'pending' }, // Default status is 'pending'
  createdAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
