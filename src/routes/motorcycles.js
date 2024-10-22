// src/routes/motorcycles.js
const express = require("express");
const router = express.Router();
const motorcycleController = require("../controllers/motorcycleController");
const verifyToken = require("../middlewares/authMiddleware"); // Asegúrate de que el middleware de autenticación esté disponible

// Rutas públicas
router.get("/", motorcycleController.getAll); // Permitido para todos
router.get("/:id", motorcycleController.getById); // Permitido para todos

// Rutas protegidas
router.use(verifyToken); // Esto aplicará el middleware a todas las rutas siguientes

router.post("/", motorcycleController.create);
router.put("/:id", motorcycleController.update);
router.delete("/:id", motorcycleController.delete);

module.exports = router;
