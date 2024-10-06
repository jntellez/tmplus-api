// src/models/userModel.js
const db = require("../config/db");

const userModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },
  create: async (user) => {
    const [result] = await db.query("INSERT INTO users SET ?", user);
    return { id: result.insertId, ...user };
  },
  update: async (id, user) => {
    await db.query("UPDATE users SET ? WHERE id = ?", [user, id]);
    return userModel.getById(id);
  },
  delete: async (id) => {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return id;
  },
};

module.exports = userModel;
