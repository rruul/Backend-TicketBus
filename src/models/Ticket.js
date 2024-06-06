const admin = require('../config/firebase');
const firestore = admin.firestore();

class Ticket {
    constructor(id, boletoId, comprador, fechaCompra) {
        this.id = id;
        this.boletoId = boletoId;
        this.comprador = comprador;
        this.fechaCompra = fechaCompra;
    }

    static async createTicket(data) {
        try {
            const ticketRef = await firestore.collection('tickets').add(data);
            return new Ticket(ticketRef.id, ...Object.values(data));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async getTicketById(id) {
        try {
            const ticketDoc = await firestore.collection('tickets').doc(id).get();
            if (ticketDoc.exists) {
                return new Ticket(id, ...Object.values(ticketDoc.data()));
            }
            return null;
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async getAllTickets() {
        try {
            const tickets = await firestore.collection('tickets').get();
            return tickets.docs.map(doc => new Ticket(doc.id, ...Object.values(doc.data())));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async deleteTicket(id) {
        try {
            await firestore.collection('tickets').doc(id).delete();
            return { message: 'success' };
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async updateTicket(id, data) {
        try {
            await firestore.collection('tickets').doc(id).update(data);
            const updatedTicket = await firestore.collection('tickets').doc(id).get();
            return { id, ...updatedTicket.data() };
        } catch (error) {
            console.log('Error: ', error);
        }
    }
}

module.exports = Ticket;