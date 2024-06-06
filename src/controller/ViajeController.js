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

const updateViaje = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedViaje = await Viaje.updateViaje(id, data);
        res.json(updatedViaje);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const buscarViaje = async (req, res) => {
    try {
        const { destino, origen, fecha } = req.query;
        
        // Realiza la consulta a Firestore para buscar los viajes que coincidan con los criterios
        const viajes = await firestore.collection('viajes')
            .where('destino', '==', destino)
            .where('origen', '==', origen)
            .where('fecha', '==', fecha)
            .get();
        
        // Mapea los resultados en objetos Viaje y devuélvelos
        const viajesEncontrados = viajes.docs.map(doc => new Viaje(doc.id, ...Object.values(doc.data())));
        
        res.json(viajesEncontrados);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { createViaje, getViajeById, getAllViajes, deleteViaje, updateViaje, buscarViaje };