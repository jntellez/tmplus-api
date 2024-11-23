const db = require("../config/db"); // Configuración de la base de datos

const deliveryModel = {
  // Crear una nueva entrega
  create: async (delivery) => {
    const query = `
      INSERT INTO deliveries (
        rental_id, motorcycle_id, delivery_date, delivery_location, delivery_instructions, status, id_owner, id_customer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await db.execute(query, [
      delivery.rental_id,
      delivery.motorcycle_id,
      delivery.delivery_date,
      delivery.delivery_location,
      delivery.delivery_instructions,
      delivery.status || "pending",
      delivery.id_owner,
      delivery.id_customer,
    ]);
    return result.insertId;
  },

  // Obtener todas las entregas
  getAll: async () => {
    const query = "SELECT * FROM deliveries;";
    const [rows] = await db.execute(query);
    return rows;
  },

  // Obtener una entrega por ID
  getById: async (id) => {
    const query = "SELECT * FROM deliveries WHERE id = ?;";
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  // Actualizar una entrega
  update: async (id, updates) => {
    const query = `
      UPDATE deliveries
      SET delivery_date = ?, delivery_location = ?, delivery_instructions = ?, status = ?
      WHERE id = ?;
    `;
    const [result] = await db.execute(query, [
      updates.delivery_date,
      updates.delivery_location,
      updates.delivery_instructions,
      updates.status,
      id,
    ]);
    return result.affectedRows > 0;
  },

  // Eliminar una entrega
  delete: async (id) => {
    const query = "DELETE FROM deliveries WHERE id = ?;";
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = deliveryModel;
