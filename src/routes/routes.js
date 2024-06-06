const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser, updateUser } = require('./../controller/UserController');
const { createBoleto, getBoletoById, getAllBoletos, deleteBoleto, updateBoleto } = require('./../controller/BoletoController');
const { createViaje, getViajeById, getAllViajes, deleteViaje, updateViaje } = require('./../controller/ViajeController');
const { createTicket, getTicketById, getAllTickets, deleteTicket, updateTicket } = require('../controller/BoletoController');
const authenticateToken = require('./../auth/AuthM');
// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/users/:email', authenticateToken, deleteUser);
router.put('/users/:email', authenticateToken, updateUser);

// Boleto routes
router.post('/boletos', createBoleto);
router.get('/boletos/:id', getBoletoById);
router.get('/boletos', getAllBoletos);
router.delete('/boletos/:id', deleteBoleto);
router.put('/boletos/:id', updateBoleto);

// Viaje routes
router.post('/viajes', createViaje);
router.get('/viajes/:id', getViajeById);
router.get('/viajes', getAllViajes);
router.delete('/viajes/:id', deleteViaje);
router.put('/viajes/:id', updateViaje);
router.get('/viajes/search', buscarViaje);
// Ticket routes
router.post('/tickets', createTicket);
router.get('/tickets/:id', getTicketById);
router.get('/tickets', getAllTickets);
router.delete('/tickets/:id', deleteTicket);
router.put('/tickets/:id', updateTicket);

module.exports = router;