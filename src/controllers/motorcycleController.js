// src/controllers/motorcycleController.js
const path = require("path");
const fs = require("fs");
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
      res.status(500).json({
        message: "Error al obtener precio de alquiler",
        error: err.message,
      });
    }
  },
  // metodos para imagenes
  addImages: async (req, res) => {
    const { motorcycleId } = req.params;

    try {
      // Mapea las rutas de las imágenes subidas para guardarlas en la base de datos
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

      // Guarda las rutas en la tabla `motorcycle_images`
      const imageRecords = imagePaths.map((imagePath) => ({
        motorcycle_id: motorcycleId,
        image_url: imagePath,
      }));
      await motorcycleModel.addImages(imageRecords);

      res.status(201).json({
        message: "Imágenes añadidas correctamente",
        images: imagePaths,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al añadir imágenes", error: err.message });
    }
  },
  getImages: async (req, res) => {
    const { motorcycleId } = req.params;
    try {
      const images = await motorcycleModel.getImagesByMotorcycleId(
        motorcycleId
      );
      if (images.length === 0) {
        return res
          .status(404)
          .json({ message: "No hay imágenes para esta moto" });
      }

      // Mapea cada imagen para devolver la URL completa
      const imagesWithUrls = images.map((image) => ({
        ...image,
        url: `http://localhost:5000${image.image_url}`, // Usa image.image_url directamente
      }));

      res.json(imagesWithUrls);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al obtener las imágenes", error: err.message });
    }
  },
  deleteImage: async (req, res) => {
    const imageId = req.params.imageId;

    try {
      const image = await motorcycleModel.getImageById(imageId);

      if (!image) {
        return res.status(404).json({ message: "Imagen no encontrada" });
      }

      const imageUrl = image.image_url;

      // Ajustar la ruta para que 'uploads' esté en el mismo nivel que 'src'
      const imagePath = path.resolve(
        __dirname,
        "../../uploads",
        imageUrl.replace("/uploads/", "")
      );

      // Verificar si el archivo existe
      if (!fs.existsSync(imagePath)) {
        return res
          .status(404)
          .json({ message: "Archivo de imagen no encontrado" });
      }

      // Eliminar la imagen del sistema de archivos
      fs.unlink(imagePath, async (err) => {
        if (err) {
          return res.status(500).json({
            message: "Error al eliminar la imagen del sistema",
            error: err.message,
          });
        }

        // Eliminar la referencia de la imagen en la base de datos
        const deleteResult = await motorcycleModel.deleteImage(imageId);
        if (deleteResult) {
          return res
            .status(200)
            .json({ message: "Imagen eliminada correctamente" });
        } else {
          return res.status(500).json({
            message: "Error al eliminar la imagen de la base de datos",
          });
        }
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al eliminar la imagen", error: err.message });
    }
  },
};

module.exports = motorcycleController;
