// src/controllers/userController.js
const userModel = require("../models/userModel");

const userController = {
  getAll: async (req, res) => {
    try {
      const users = await userModel.getAll();
      res.json(users);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al obtener usuarios", error: err.message });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.getById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al obtener el usuario", error: err.message });
    }
  },
  create: async (req, res) => {
    const newUser = req.body;
    try {
      const createdUser = await userModel.create(newUser);
      res.status(201).json(createdUser);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al crear el usuario", error: err.message });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
      const user = await userModel.update(id, updatedUser);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (err) {
      res
        .status(400)
        .json({
          message: "Error al actualizar el usuario",
          error: err.message,
        });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.delete(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(204).send(); // No content
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar el usuario", error: err.message });
    }
  },
};

module.exports = userController;
