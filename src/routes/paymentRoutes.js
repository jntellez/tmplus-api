const express = require("express");
const { createPayment, webhook } = require("../controllers/paymentController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta para crear un pago, protegida con el middleware verifyToken
router.post("/create", verifyToken, createPayment);
router.post("/webhook", webhook);

module.exports = router;
