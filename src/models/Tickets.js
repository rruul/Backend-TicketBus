const admin = require('../config/firebase')
const ITicket = require('../interfaces/ITickets')
const firestore = admin.firestore()

class Ticket extends ITicket {
    constructor (nombre, apellidos, Folio, Origen, Destino, Fecha, HoraSalida, HoraArribo, Total, TokenFacturacion, Asiento) {
        super()
        this.nombre = nombre
        this.apellidos = apellidos
        this.Folio = Folio
        this.Origen = Origen
        this.Destino = Destino
        this.Fecha = Fecha
        this.HoraSalida = HoraSalida
        this.HoraArribo = HoraArribo
        this.Total = Total
        this.TokenFacturacion = TokenFacturacion
        this.Asiento = Asiento
    }
    static async createTicket (nombre, apellidos, Folio, Origen, Destino, Fecha, HoraSalida, HoraArribo, Total, TokenFacturacion, Asiento) {
        try {
            const ticket = firestore.collection('tickets').doc(Folio)
            await ticket.set({
                nombre,
                apellidos,
                NOperacion,
                TipoPasajero,
                Origen,
                Destino,
                Fecha,
                HoraSalida,
                HoraArribo,
                Total,
                TokenFacturacion,
                Asiento
            })
            return new Ticket(nombre, apellidos, Folio, Origen, Destino, Fecha, HoraSalida, HoraArribo, Total, TokenFacturacion, Asiento)
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    static async findByFolio (Folio) {
        try {
            const ticket = firestore.collection('tickets').doc(Folio)
            const ticketDoc = await ticket.get()
            if (ticketDoc.exists) {
                const ticketData = ticketDoc.data()
                return new Ticket(ticketData.NOperacion)
            }
            return null
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    static async deleteTicket (ticketFolio) {
        try {
            await firestore.collection('tickets').doc(ticketFolio).delete()
            message: 'success'
        } catch (error) {
            message: 'Internal Server Error'
        }
    }
}

module.exports = Ticket