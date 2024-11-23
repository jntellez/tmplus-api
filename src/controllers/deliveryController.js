const deliveryModel = require("../models/deliveryModel");

const deliveryController = {
  // Crear una nueva entrega
  create: async (req, res) => {
    try {
      const deliveryId = await deliveryModel.create(req.body);
      res.status(201).json({ message: "Delivery created", id: deliveryId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating delivery" });
    }
  },

  // Obtener todas las entregas
  getAll: async (req, res) => {
    try {
      const deliveries = await deliveryModel.getAll();
      res.status(200).json(deliveries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching deliveries" });
    }
  },

  // Obtener una entrega por ID
  getById: async (req, res) => {
    try {
      const delivery = await deliveryModel.getById(req.params.id);
      if (!delivery) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.status(200).json(delivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching delivery" });
    }
  },

  // Actualizar una entrega
  update: async (req, res) => {
    try {
      const updated = await deliveryModel.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.status(200).json({ message: "Delivery updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating delivery" });
    }
  },

  // Eliminar una entrega
  delete: async (req, res) => {
    try {
      const deleted = await deliveryModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.status(200).json({ message: "Delivery deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting delivery" });
    }
  },
};

module.exports = deliveryController;
