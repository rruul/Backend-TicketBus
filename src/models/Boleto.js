const admin = require('../config/firebase');
const firestore = admin.firestore();

class Boleto {
    constructor(id, origen, destino, horaSalida, fecha, costo, asiento, infoViajero, horaLlegada, createdAt) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.horaSalida = horaSalida;
        this.horaLlegada = horaLlegada;
        this.fecha = fecha;
        this.costo = costo;
        this.asiento = asiento;
        this.infoViajero = infoViajero;
        this.createdAt = createdAt;
    }

    static async createBoleto(data) {
        try {
            const createdAt = new Date();
            const dataWithTimestamp = { ...data, createdAt };
            const boletoRef = await firestore.collection('boletos').add(dataWithTimestamp);
            return new Boleto(boletoRef.id, ...Object.values(dataWithTimestamp));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async getLatestBoleto() {
        try {
            const latestBoletoQuery = await firestore.collection('boletos').orderBy('createdAt', 'desc').limit(1).get();
            if (!latestBoletoQuery.empty) {
                const latestBoletoDoc = latestBoletoQuery.docs[0];
                const data = latestBoletoDoc.data();
                return new Boleto(
                    latestBoletoDoc.id,
                    data.origen,
                    data.destino,
                    data.horaSalida,
                    data.fecha,
                    data.costo,
                    data.asiento,
                    data.infoViajero,
                    data.horaLlegada
                );
            }
            return null;
        } catch (error) {
            console.log('Error: ', error);
            return null;
        }
    }

    static async getAllBoletos() {
        try {
            const boletos = await firestore.collection('boletos').get();
            return boletos.docs.map(doc => new Boleto(doc.id, ...Object.values(doc.data())));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async deleteBoleto(id) {
        try {
            await firestore.collection('boletos').doc(id).delete();
            return { message: 'success' };
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async updateBoleto(id, data) {
        try {
            await firestore.collection('boletos').doc(id).update(data);
            const updatedBoleto = await firestore.collection('boletos').doc(id).get();
            return { id, ...updatedBoleto.data() };
        } catch (error) {
            console.log('Error: ', error);
        }
    }
}

module.exports = Boleto;
