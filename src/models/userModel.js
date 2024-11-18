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
    const keys = Object.keys(user)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(user);

    const query = `UPDATE users SET ${keys} WHERE id = ?`;

    await db.query(query, [...values, id]);
    return await userModel.getById(id);
  },
  delete: async (id) => {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return id;
  },
  updatePassword: async (id, hashedPassword) => {
    const query = "UPDATE users SET password = ? WHERE id = ?";
    await db.execute(query, [hashedPassword, id]);
    return await userModel.getById(id);
  },
};

module.exports = userModel;
