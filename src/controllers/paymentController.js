const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const db = require("../config/db");

// Crear una instancia de MercadoPagoConfig con el access token
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

// Crear una instancia de Preference
const preference = new Preference(client);
const paymentOb = new Payment(client);

// Función para crear el pago
const createPayment = async (req, res) => {
  const { items, buyer, commission, rentalId } = req.body;

  try {
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
        rentalId: rentalId.toString(),
      },
      marketplace_fee: commission,
      notification_url:
        "https://d906-2806-266-48b-30-9dc-b013-7a1c-a965.ngrok-free.app/api/payments/webhook",
    };

    // Crear la preferencia
    const response = await preference.create({ body: preferenceBody });

    // Retornar el link de pago de Mercado Pago
    res.json({
      initial_point: response.init_point,
      sandbox_initial_point: response.sandbox_init_point,
      rentalId: response.external_reference,
      marketplace_fee: response.marketplace_fee,
      id: response.id,
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
  //   const paymentId = req.body.data.id;
  //   console.log(paymentId);
  //   console.log(req.body);
  const payment = req.query;
  const id = payment["data.id"];
  await add(id);
  //   const eventType = req.body.type; // Tipo de evento del webhook

  //   if (eventType === "payment") {
  //     //await add(paymentId);
  //   }

  return res.status(200).send("OK");
};

const add = async (id) => {
  console.log(id);
  setTimeout(async () => {
    try {
      const payment = await paymentOb.get({ id });
      console.log(payment);
      // Procesa el pago aquí
    } catch (error) {
      console.error("Error al procesar el webhook después del retraso:", error);
    }
  }, 5000); // Espera de 10 segundos

  //   console.log(payment);

  //   if (paymentData.type === "payment") {
  //     const paymentId = paymentData.data.id;
  //     try {
  //       // Obtener el estado del pago
  //       const payment = await paymentOb.get({ id: paymentId });
  //       console.log(payment);
  //       const paymentStatus = payment.body.status;
  //       const rentalId = payment.body.external_reference; // Recupera el rentalId
  //       // Consultar la renta con el rentalId en la base de datos
  //       const [rentalResult] = await db
  //         .promise()
  //         .query("SELECT * FROM rentals WHERE id = ?", [rentalId]);
  //       if (rentalResult.length) {
  //         // Determina el nuevo estado de la renta según el estado del pago
  //         let newStatus;
  //         if (paymentStatus === "approved") {
  //           newStatus = "confirmed";
  //         } else if (paymentStatus === "rejected") {
  //           newStatus = "cancelled";
  //         } else if (paymentStatus === "pending") {
  //           newStatus = "pending";
  //         }
  //         // Actualizar el estado de la renta en la base de datos
  //         await db
  //           .promise()
  //           .query("UPDATE rentals SET status = ? WHERE id = ?", [
  //             newStatus,
  //             rentalId,
  //           ]);
  //         res.status(200).send("Pago procesado correctamente.");
  //       } else {
  //         res.status(404).send("Renta no encontrada.");
  //       }
  //     } catch (error) {
  //       console.error("Error al procesar el webhook: ", error);
  //       res.status(500).send("Error al procesar la notificación de pago.");
  //     }
  //   } else {
  //     res.status(400).send("Notificación no válida.");
  //   }
};

module.exports = { createPayment, webhook };
