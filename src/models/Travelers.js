const admin = require('../config/firebase')
const ITravelers = require('../interfaces/ITravelers')
const firestore = admin.firestore()

class Travelers extends ITravelers {
    constructor (email, nombre, apaterno, amaterno, telefono) {
        super()
        this.email = email
        this.nombre = nombre
        this.apaterno = apaterno
        this.amaterno = amaterno
        this.telefono = telefono
    }
    static async createTraveler (email, nombre, apaterno, amaterno, telefono) {
        try {
            const traveler = firestore.collection('travelers').doc(email)
            await traveler.set({
                email,
                nombre,
                apaterno,
                amaterno,
                telefono
            })
            return new Traveler(email, nombre, apaterno, amaterno, telefono)
        } catch (error) {
            console.log('Error: ', error)
        }
    }
}

module.exports = Travelers