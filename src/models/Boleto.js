const admin = require('../config/firebase');
const firestore = admin.firestore();

class Boleto {
    constructor(id, origen, destino, horaSalida, terminal, noOperacion, fecha, costo, asiento, infoViajero) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.horaSalida = horaSalida;
        this.terminal = terminal;
        this.noOperacion = noOperacion;
        this.fecha = fecha;
        this.costo = costo;
        this.asiento = asiento;
        this.infoViajero = infoViajero;
    }

    static async createBoleto(data) {
        try {
            const boletoRef = await firestore.collection('boletos').add(data);
            return new Boleto(boletoRef.id, ...Object.values(data));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async getBoletoById(id) {
        try {
            const boletoDoc = await firestore.collection('boletos').doc(id).get();
            if (boletoDoc.exists) {
                return new Boleto(id, ...Object.values(boletoDoc.data()));
            }
            return null;
        } catch (error) {
            console.log('Error: ', error);
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
