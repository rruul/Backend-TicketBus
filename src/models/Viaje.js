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
          return { id, ...viajeDoc.data() };
        } catch (error) {
          console.log('Error: ', error);
        }
    }

    static async getAllViajes() {
        try {
            const viajes = await firestore.collection('viajes').get();
            const allViajes = []
            viajes.forEach(doc => {
                allViajes.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            return allViajes;
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

    static async reservarAsiento(id, asiento) {
        try {
            const viajeRef = firestore.collection('viajes').doc(id);
            const viajeDoc = await viajeRef.get();
            
            if (!viajeDoc.exists) {
                throw new Error('Viaje no encontrado');
            }

            const viajeData = viajeDoc.data();
            const asientos = viajeData.Asientos || {};
            const Ocupados = asientos.Ocupados || [];
            const Disponibles = asientos.Disponibles || [];

            // Verificar si el asiento ya está ocupado
            if (Ocupados.includes(asiento)) {
                throw new Error('El asiento ya está ocupado');
            }

            // Actualizar los asientos ocupados y disponibles
            const nuevosOcupados = [...Ocupados, asiento];
            const nuevosDisponibles = Disponibles.filter(lugar => lugar !== asiento);

            await viajeRef.update({
                'Asientos.Ocupados': nuevosOcupados,
                'Asientos.Disponibles': nuevosDisponibles
            });

            const updatedViaje = await viajeRef.get();
            return { id, ...updatedViaje.data() };
        } catch (error) {
            console.log('Error: ', error);
            throw error;
        }
    }
    static async buscarViaje(origen, destino, Fecha) {
        try {
            const viajes = await firestore.collection('viajes')
            .where('origen', '==', origen)
            .where('destino', '==', destino)
            .where('fecha', '==', Fecha)
            .get();
            const viaje = []
            viajes.forEach(doc => {
            viaje.push({
                id: doc.id,
                ...doc.data()
            })
            })

            return viaje
        } catch (error) {
            console.log('Error: ', error);
        }
    }
}

module.exports = Viaje;