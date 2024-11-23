const { MercadoPagoConfig, Preference } = require("mercadopago");
const db = require("../config/db");
const { getById: getUserById } = require("../models/userModel");
const { getById: getMotorcycleById } = require("../models/motorcycleModel");
const { create: createDelivery } = require("../models/deliveryModel");

// Función para crear el pago
const createPayment = async (req, res) => {
  const { items, buyer, commission, rentalId, ownerId } = req.body;

  try {
    const { mp_access_token } = await getUserById(ownerId);

    // Crear una instancia de MercadoPagoConfig con el access token
    const client = new MercadoPagoConfig({
      accessToken: mp_access_token,
    });
    // Crear una instancia de Preference
    const preference = new Preference(client);

    // Crear la preferencia de pago utilizando la nueva forma del SDK
    const preferenceBody = {
      items, // Los detalles de los productos (motorcicletas, alquileres, etc.)
      payer: buyer, // Información del comprador
      payment_methods: {
        excluded_payment_types: [{ id: "ticket" }],
        installments: 1,
      },
      additional_info: "Comisión incluida", // Información adicional para la transacción
      metadata: {
        rentalId: rentalId,
      },
      marketplace_fee: commission,
      notification_url: `${process.env.URL}/api/payments/webhook?rentalId=${rentalId}`,
    };

    // Crear la preferencia
    const response = await preference.create({ body: preferenceBody });

    // Retornar el link de pago de Mercado Pago
    res.json({
      initial_point: response.init_point,
      sandbox_initial_point: response.sandbox_init_point,
      rentalId: response.metadata.rentalId,
    });
  } catch (error) {
    console.error("Error al crear el pago", error.response || error.message);
    res
      .status(500)
      .json({ message: "Error al procesar el pago", error: error.message });
  }
};

// Función para procesar el webhook
const webhook = async (req, res) => {
  const rentalId = req.query.rentalId; // Obtener el rentalId de la URL del webhook

  if (!rentalId) {
    return res.status(400).send("rentalId no proporcionado");
  }

  try {
    // Buscar la renta en la base de datos usando el rentalId
    const rental = await db.query("SELECT * FROM rentals WHERE id = ?", [
      rentalId,
    ]);

    if (!rental || rental.length === 0) {
      return res.status(404).send("Renta no encontrada");
    }

    // Actualizar el estado de la renta a 'confirmed'
    await db.query("UPDATE rentals SET status = ? WHERE id = ?", [
      "confirmed",
      rentalId,
    ]);

    // Responder al webhook
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error al procesar la notificación del webhook:", error);
    return res.status(500).send("Error al procesar la notificación");
  }
};

const addDelivery = async (rental) => {
  try {
    // Extraer los datos relevantes
    const customer = await getUserById(rental.user_id);
    const motorcycle = await getMotorcycleById(rental.motorcycle_id);
    const owner = await getUserById(motorcycle.user_id);

    const delivery = await createDelivery({
      rental_id: rental.id,
      delivery_date: rental.start_date,
      delivery_location: customer.address,
      delivery_instructions: rental.delivery_instructions,
      status: rental.status,
      id_owner: owner.id,
      id_customer: customer.id,
    });

    return delivery;
  } catch (error) {
    console.error("Error retrieving rental details:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// // Función para procesar el webhook
// const webhook = async (req, res) => {
//   const id = await req.query["data.id"];

//   try {
//     const payment = await paymentOb.get({ id });
//     if (payment.type === "payment") {
//       console.log(payment);
//       const { rentalId } = payment.metadata;
//       if (!rentalId) {
//         return res.status(400).send("rentalId no proporcionado");
//       }

//       // Buscar la renta en la base de datos usando el rentalId
//       const rental = await db.query("SELECT * FROM rentals WHERE id = ?", [
//         rentalId,
//       ]);

//       if (!rental || rental.length === 0) {
//         return res.status(404).send("Renta no encontrada");
//       }

//       // Actualizar el estado de la renta a 'confirmed'
//       await db.query("UPDATE rentals SET status = ? WHERE id = ?", [
//         "confirmed",
//         rentalId,
//       ]);
//     }

//     // Responder al webhook
//     return res.status(200).send("OK");
//   } catch (error) {
//     console.error("Error al procesar la notificación del webhook:", error);
//     return res.status(500).send("Error al procesar la notificación");
//   }
// };

module.exports = { createPayment, webhook };
