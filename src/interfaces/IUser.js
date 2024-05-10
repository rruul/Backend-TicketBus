class IUser {
    static async createUser(email, password, nombre, apaterno, amaterno, direccion, telefono) {}
    static async findByEmail(email) {}
    async verifyPassword(password) {}
}

class ITickets {
    static async createTicket() {}
    static async findByEmail(email) {}
    static async getAllUsers() {}
    static async deleteUser(email) {}
    static async updateUser(email, userData) {}
}

module.exports = IUser
module.exports = ITickets