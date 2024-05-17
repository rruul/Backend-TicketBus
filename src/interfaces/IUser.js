class IUser {
    static async createUser(email, password, nombre, apaterno, amaterno, direccion, telefono) {}
    static async findByEmail(email) {}
    async verifyPassword(password) {}
}

module.exports = IUser