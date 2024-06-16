const Viaje = require('../models/Viaje');

const createViaje = async (req, res) => {
    try {
        const data = req.body;
        const newViaje = await Viaje.createViaje(data);
        res.status(201).json(newViaje);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getViajeById = async (req, res) => {
    try {
        const { id } = req.params;
        const viaje = await Viaje.getViajeById(id);
        if (viaje) {
            res.json(viaje);
        } else {
            res.status(404).json({ message: 'Viaje not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllViajes = async (req, res) => {
    try {
        const viajes = await Viaje.getAllViajes();
        res.json(viajes);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteViaje = async (req, res) => {
    try {
        const { id } = req.params;
        await Viaje.deleteViaje(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const reservarAsiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { asiento } = req.body;
        const viajeActualizado = await Viaje.reservarAsiento(id, asiento);
        res.json({ viaje: viajeActualizado });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const buscarViaje = async (req, res) => {
    try {
      const { origen, destino, Fecha } = req.body; // Accede a los tres parámetros
      
      const viajes = await Viaje.buscarViaje(origen, destino, Fecha); // Pasa los tres parámetros a la función buscarViaje
      
      res.json(viajes);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


module.exports = { createViaje, getViajeById, getAllViajes, deleteViaje, reservarAsiento, buscarViaje };