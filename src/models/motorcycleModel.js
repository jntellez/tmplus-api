// src/models/motorcycleModel.js
const db = require("../config/db");

const motorcycleModel = {
  getAll: async (page = 1, limit = 5) => {
    const offset = (page - 1) * limit;

    // Obtener las motocicletas
    const [rows] = await db.query("SELECT * FROM motorcycles LIMIT ?, ?", [
      offset,
      limit,
    ]);

    // Obtener el total de motocicletas para calcular el número total de páginas
    const [[{ total }]] = await db.query(
      "SELECT COUNT(*) AS total FROM motorcycles"
    );

    return {
      motorcycles: rows,
      totalPages: Math.ceil(total / limit), // Calcula el número total de páginas
    };
  },
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM motorcycles WHERE id = ?", [
      id,
    ]);
    return rows[0]; // Retorna el primer elemento (la moto)
  },
  create: async (motorcycle) => {
    const [result] = await db.query(
      "INSERT INTO motorcycles SET ?",
      motorcycle
    );
    return { id: result.insertId, ...motorcycle };
  },
  update: async (id, motorcycle) => {
    await db.query("UPDATE motorcycles SET ? WHERE id = ?", [motorcycle, id]);
    return motorcycleModel.getById(id);
  },
  delete: async (id) => {
    await db.query("DELETE FROM motorcycles WHERE id = ?", [id]);
    return id;
  },
  getRentalPrice: async (id) => {
    const [rows] = await db.query(
      "SELECT rental_price FROM motorcycles WHERE id = ?",
      [id]
    );
    return rows[0]?.rental_price || null; // Retorna el precio o null si no existe
  },
  // Metodos para las imagenes
  addImages: async (images) => {
    const placeholders = images.map(() => "(?, ?)").join(", ");
    const values = images.flatMap((image) => [
      image.motorcycle_id,
      image.image_url,
    ]);

    await db.query(
      `INSERT INTO motorcycle_images (motorcycle_id, image_url) VALUES ${placeholders}`,
      values
    );
  },
  getImages: async (motorcycleId) => {
    const [rows] = await db.query(
      "SELECT id, image_url FROM motorcycle_images WHERE motorcycle_id = ?",
      [motorcycleId]
    );
    return rows; // Retorna todas las imágenes asociadas a la motocicleta
  },
  getImageById: async (imageId) => {
    const [rows] = await db.query(
      "SELECT * FROM motorcycle_images WHERE id = ?",
      [imageId]
    );
    return rows[0]; // Retorna la imagen si existe
  },

  getImagesByMotorcycleId: async (motorcycleId) => {
    try {
      const query = "SELECT * FROM motorcycle_images WHERE motorcycle_id = ?";
      const [rows] = await db.execute(query, [motorcycleId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  deleteImage: async (imageId) => {
    const [result] = await db.query(
      "DELETE FROM motorcycle_images WHERE id = ?",
      [imageId]
    );
    return result.affectedRows > 0; // Retorna true si se eliminó correctamente
  },
};

module.exports = motorcycleModel;
