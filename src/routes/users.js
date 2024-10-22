const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

// Rutas de usuarios
router.get("/", verifyToken, userController.getAll); // Requiere autenticación para ver todos los usuarios
router.get("/:id", verifyToken, userController.getById); // Requiere autenticación para ver un usuario específico
router.post("/", userController.create); // No requiere autenticación para registrar un nuevo usuario
router.put("/:id", verifyToken, userController.update); // Requiere autenticación para actualizar el usuario
router.delete("/:id", verifyToken, userController.delete); // Requiere autenticación para eliminar usuarios

module.exports = router;
