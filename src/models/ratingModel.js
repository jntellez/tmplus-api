// src/models/ratingModel.js
const db = require("../config/db");

const ratingModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM ratings");
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM ratings WHERE id = ?", [id]);
    return rows[0];
  },
  create: async (rating) => {
    const [result] = await db.query("INSERT INTO ratings SET ?", rating);
    return { id: result.insertId, ...rating };
  },
  update: async (id, rating) => {
    await db.query("UPDATE ratings SET ? WHERE id = ?", [rating, id]);
    return ratingModel.getById(id);
  },
  delete: async (id) => {
    await db.query("DELETE FROM ratings WHERE id = ?", [id]);
    return id;
  },
};

module.exports = ratingModel;
