// src/models/rentalModel.js
const db = require("../config/db");

const rentalModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM rentals");
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM rentals WHERE id = ?", [id]);
    return rows[0];
  },
  create: async (rental) => {
    const [result] = await db.query("INSERT INTO rentals SET ?", rental);
    return { id: result.insertId, ...rental };
  },
  update: async (id, rental) => {
    await db.query("UPDATE rentals SET ? WHERE id = ?", [rental, id]);
    return rentalModel.getById(id);
  },
  delete: async (id) => {
    await db.query("DELETE FROM rentals WHERE id = ?", [id]);
    return id;
  },
};

module.exports = rentalModel;
