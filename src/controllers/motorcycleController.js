// src/controllers/motorcycleController.js
const motorcycleModel = require("../models/motorcycleModel");

const motorcycleController = {
  getAll: async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Obtiene el número de página de la consulta
    const limit = parseInt(req.query.limit) || 5; // Establece un límite predeterminado

    try {
      const { motorcycles, totalPages } = await motorcycleModel.getAll(
        page,
        limit
      );
      res.json({ motorcycles, totalPages }); // Devuelve motocicletas y total de páginas
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al obtener motos", error: err.message });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const motorcycle = await motorcycleModel.getById(id);
      if (!motorcycle) {
        return res.status(404).json({ message: "Moto no encontrada" });
      }
      res.json(motorcycle);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al obtener la moto", error: err.message });
    }
  },
  create: async (req, res) => {
    const newMotorcycle = req.body;
    try {
      const createdMotorcycle = await motorcycleModel.create(newMotorcycle);
      res.status(201).json(createdMotorcycle);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al crear la moto", error: err.message });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const updatedMotorcycle = req.body;
    try {
      const motorcycle = await motorcycleModel.update(id, updatedMotorcycle);
      if (!motorcycle) {
        return res.status(404).json({ message: "Moto no encontrada" });
      }
      res.json(motorcycle);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al actualizar la moto", error: err.message });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const motorcycle = await motorcycleModel.delete(id);
      if (!motorcycle) {
        return res.status(404).json({ message: "Moto no encontrada" });
      }
      res.status(204).send();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar la moto", error: err.message });
    }
  },
  getRentalPrice: async (req, res) => {
    const { id } = req.params;
    try {
      const rentalPrice = await motorcycleModel.getRentalPrice(id);
      if (rentalPrice === null) {
        return res
          .status(404)
          .json({ message: "Precio de alquiler no encontrado" });
      }
      res.json({ rentalPrice });
    } catch (err) {
      res
        .status(500)
        .json({
          message: "Error al obtener precio de alquiler",
          error: err.message,
        });
    }
  },
};

module.exports = motorcycleController;
