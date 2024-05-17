const admin = require('../config/firebase')
const ITravels = require('../interfaces/ITravels')
const firestore = admin.firestore()

class Travels extends ITravels {
    constructor (IdViaje, Fecha, HoraSalida, HoraArribo, LugarSalida, Destino, Lugares) {
        super()
        this.IdViaje = IdViaje,
        this.Fecha = Fecha,
        this.HoraSalida = HoraSalida,
        this.HoraArribo = HoraArribo,
        this.LugarSalida = LugarSalida,
        this.Destino = Destino,
        this.Lugares = Lugares
    }
    static async createTravels (IdViaje, Fecha, HoraSalida, HoraArribo, LugarSalida, Destino, Lugares) {
        try {
            const travel = firestore.collection('travels').doc(IdViaje)
            await travel.set({
                IdViaje,
                Fecha,
                HoraSalida,
                HoraArribo,
                LugarSalida,
                Destino,
                Lugares
            })
            return new Travels(IdViaje, Fecha, HoraSalida, HoraArribo, LugarSalida, Destino, Lugares)
        } catch (error) {
            console.log('Error: ', error)
        }
    }
}

module.exports = Travels