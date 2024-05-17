const Ticket = require('../models/Tickets')
const admin = require('firebase-admin')


const generateTicket = async (req, res) => {
    try {
        const { nombre, apellidos, Folio, Origen, Destino, Fecha, HoraSalida, HoraArribo, Total, TokenFacturacion, Asiento } = req.body
        const existingTicket = await Ticket.findByFolio(Folio)
        if (existingUser) {
            return res.status(400).json({
                message: 'Folio already exists'
            })
        }
        
        // Guardar en la base de datos
        await admin.firestore().collection('Ticket').doc(Folio).set({
            nombre: nombre,
            apellidos: apellidos,
            Folio: Folio,
            Origen: Origen,
            Destino: Destino,
            Fecha: Fecha,
            HoraSalida: HoraSalida,
            HoraArribo: HoraArribo,
            Total : Total,
            TokenFacturacion: TokenFacturacion,
            Asiento: Asiento
        })

        // Crear el nuevo ticket en la aplicación
        const newTicket = await User.generateTicket(nombre, apellidos, Folio, Origen, Destino, Fecha, HoraSalida, HoraArribo, Total, TokenFacturacion, Asiento)
        
        // Enviar la respuesta al cliente
        res.status(201).json({
            message: 'Ticket generated successfully',
            ticket: newTicket
        })
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

const getAllTickets = async (req, res) => {
    try{
        const tickets = await Ticket.getAllTickets()
        res.json({
            tickets,
            message: 'success'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

const deleteTicket = async (req, res) => {
    const ticketFolio = req.params.Folio
    try{
        await Ticket.deleteTicket(ticketFolio)
        res.status(204).send()
        message: 'success'
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = { generateTicket, getAllTickets, deleteTicket}