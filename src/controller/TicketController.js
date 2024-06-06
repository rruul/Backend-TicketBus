const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
    try {
        const data = req.body;
        const newTicket = await Ticket.createTicket(data);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.getTicketById(id);
        if (ticket) {
            res.json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.getAllTickets();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        await Ticket.deleteTicket(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedTicket = await Ticket.updateTicket(id, data);
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createTicket, getTicketById, getAllTickets, deleteTicket, updateTicket };