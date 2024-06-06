const admin = require('../config/firebase');
const firestore = admin.firestore();

class Viaje {
    constructor(id, origen, destino, horaSalida, horaLlegada, terminalesIntermedios, lugaresDisponibles, lugaresOcupados) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.horaSalida = horaSalida;
        this.horaLlegada = horaLlegada;
        this.terminalesIntermedios = terminalesIntermedios;
        this.lugaresDisponibles = lugaresDisponibles;
        this.lugaresOcupados = lugaresOcupados;
    }

    static async createViaje(data) {
        try {
            const viajeRef = await firestore.collection('viajes').add(data);
            return new Viaje(viajeRef.id, ...Object.values(data));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async getViajeById(id) {
        try {
            const viajeDoc = await firestore.collection('viajes').doc(id).get();
            if (viajeDoc.exists) {
                return new Viaje(id, ...Object.values(viajeDoc.data()));
            }
            return null;
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async getAllViajes() {
        try {
            const viajes = await firestore.collection('viajes').get();
            return viajes.docs.map(doc => new Viaje(doc.id, ...Object.values(doc.data())));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async deleteViaje(id) {
        try {
            await firestore.collection('viajes').doc(id).delete();
            return { message: 'success' };
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async updateViaje(id, data) {
        try {
            await firestore.collection('viajes').doc(id).update(data);
            const updatedViaje = await firestore.collection('viajes').doc(id).get();
            return { id, ...updatedViaje.data() };
        } catch (error) {
            console.log('Error: ', error);
        }
    }
}

module.exports = Viaje;