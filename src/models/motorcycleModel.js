// src/models/motorcycleModel.js
const db = require("../config/db");

const motorcycleModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM motorcycles");
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM motorcycles WHERE id = ?", [
      id,
    ]);
    return rows[0];
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
};

module.exports = motorcycleModel;
