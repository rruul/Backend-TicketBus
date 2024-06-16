const Boleto = require('../models/Boleto');

const createBoleto = async (req, res) => {
    try {
        const data = req.body;
        const newBoleto = await Boleto.createBoleto(data);
        res.status(201).json(newBoleto);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getLatestBoleto = async (req, res) => {
    try {
        const latestBoleto = await Boleto.getLatestBoleto();
        if (latestBoleto) {
            res.json(latestBoleto);
        } else {
            res.status(404).json({ message: 'Boleto not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllBoletos = async (req, res) => {
    try {
        const boletos = await Boleto.getAllBoletos();
        res.json(boletos);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteBoleto = async (req, res) => {
    try {
        const { id } = req.params;
        await Boleto.deleteBoleto(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateBoleto = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedBoleto = await Boleto.updateBoleto(id, data);
        res.json(updatedBoleto);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createBoleto, getLatestBoleto, getAllBoletos, deleteBoleto, updateBoleto };