// src/routes/ratings.js
const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const verifyToken = require("../middlewares/authMiddleware"); // Asegúrate de que el middleware de autenticación esté disponible

// Rutas públicas
router.get("/", ratingController.getAll); // Permitido para todos
router.get("/:id", ratingController.getById); // Permitido para todos

// Rutas protegidas
router.use(verifyToken); // Esto aplicará el middleware a todas las rutas siguientes

router.post("/", ratingController.create);
router.put("/:id", ratingController.update);
router.delete("/:id", ratingController.delete);

module.exports = router;
