const express = require("express");
const deliveryController = require("../controllers/deliveryController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(verifyToken);
// Crear una nueva entrega
router.post("/", deliveryController.create);

// Obtener todas las entregas
router.get("/", deliveryController.getAll);

// Obtener una entrega por ID
router.get("/:id", deliveryController.getById);

// Actualizar una entrega
router.put("/:id", deliveryController.update);

// Eliminar una entrega
router.delete("/:id", deliveryController.delete);

module.exports = router;
