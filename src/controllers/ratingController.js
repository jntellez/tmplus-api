// src/controllers/ratingController.js
const ratingModel = require("../models/ratingModel");

const ratingController = {
  getAll: async (req, res) => {
    try {
      const ratings = await ratingModel.getAll();
      res.json(ratings);
    } catch (err) {
      res
        .status(500)
        .json({
          message: "Error al obtener calificaciones",
          error: err.message,
        });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const rating = await ratingModel.getById(id);
      if (!rating) {
        return res.status(404).json({ message: "Calificación no encontrada" });
      }
      res.json(rating);
    } catch (err) {
      res
        .status(500)
        .json({
          message: "Error al obtener la calificación",
          error: err.message,
        });
    }
  },
  create: async (req, res) => {
    const newRating = req.body;
    try {
      const createdRating = await ratingModel.create(newRating);
      res.status(201).json(createdRating);
    } catch (err) {
      res
        .status(400)
        .json({
          message: "Error al crear la calificación",
          error: err.message,
        });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const updatedRating = req.body;
    try {
      const rating = await ratingModel.update(id, updatedRating);
      if (!rating) {
        return res.status(404).json({ message: "Calificación no encontrada" });
      }
      res.json(rating);
    } catch (err) {
      res
        .status(400)
        .json({
          message: "Error al actualizar la calificación",
          error: err.message,
        });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const rating = await ratingModel.delete(id);
      if (!rating) {
        return res.status(404).json({ message: "Calificación no encontrada" });
      }
      res.status(204).send();
    } catch (err) {
      res
        .status(500)
        .json({
          message: "Error al eliminar la calificación",
          error: err.message,
        });
    }
  },
};

module.exports = ratingController;
