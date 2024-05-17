class ITickets {
    static async createTicket(nombre, apellidos, NOperacion, Origen, Destino, Fecha, HoraSalida, HoraArribo, Total, TokenFacturacion, Asiento) {}
    static async findByFolio(NOperacion) {}
}

module.exports = ITickets