// src/controllers/rentalController.js
const rentalModel = require("../models/rentalModel");

const rentalController = {
  getAll: async (req, res) => {
    try {
      const rentals = await rentalModel.getAll();
      res.json(rentals);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al obtener reservas", error: err.message });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const rental = await rentalModel.getById(id);
      if (!rental) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
      res.json(rental);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al obtener la reserva", error: err.message });
    }
  },
  create: async (req, res) => {
    const newRental = req.body;
    try {
      const createdRental = await rentalModel.create(newRental);
      res.status(201).json(createdRental);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al crear la reserva", error: err.message });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const updatedRental = req.body;
    try {
      const rental = await rentalModel.update(id, updatedRental);
      if (!rental) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
      res.json(rental);
    } catch (err) {
      res
        .status(400)
        .json({
          message: "Error al actualizar la reserva",
          error: err.message,
        });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const rental = await rentalModel.delete(id);
      if (!rental) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
      res.status(204).send();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar la reserva", error: err.message });
    }
  },
};

module.exports = rentalController;
