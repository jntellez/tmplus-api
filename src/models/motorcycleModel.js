// src/models/motorcycleModel.js
const db = require("../config/db");

const motorcycleModel = {
  getAll: async (page = 1, limit = 5) => {
    const offset = (page - 1) * limit;

    // Obtener las motocicletas
    const [motorcycles] = await db.query(
      "SELECT * FROM motorcycles LIMIT ?, ?",
      [offset, limit]
    );

    // Obtener el total de motocicletas para calcular el número total de páginas
    const [[{ total }]] = await db.query(
      "SELECT COUNT(*) AS total FROM motorcycles"
    );

    // Obtener las imágenes de cada motocicleta y asociarlas
    for (let motorcycle of motorcycles) {
      const images = await motorcycleModel.getImagesByMotorcycleId(
        motorcycle.id
      );
      motorcycle.images = images.map((image) => image.image_url); // Agregar las imágenes al objeto motocicleta
    }

    return {
      motorcycles, // Las motocicletas incluyen el ID y las imágenes
      totalPages: Math.ceil(total / limit), // Calcula el número total de páginas
    };
  },
  getByUserId: async (userId) => {
    const query = `
        SELECT * 
        FROM motorcycles
        WHERE user_id = ?;
      `;
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },
  getById: async (id) => {
    const [motorcycles] = await db.query(
      "SELECT * FROM motorcycles WHERE id = ?",
      [id]
    );
    if (motorcycles.length > 0) {
      const motorcycle = motorcycles[0];
      const images = await motorcycleModel.getImagesByMotorcycleId(
        motorcycle.id
      );
      motorcycle.images = images.map((image) => image.image_url); // Agregar imágenes
      return motorcycle;
    }
    return null;
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
    return result.affectedRows > 0; // Retorna true si la imagen fue eliminada correctamente
  },
};

module.exports = motorcycleModel;
