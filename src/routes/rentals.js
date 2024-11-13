const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");
const verifyToken = require("../middlewares/authMiddleware"); // Asegúrate de tener el middleware de autenticación

// Rutas protegidas
router.use(verifyToken); // Esto aplicará el middleware a todas las rutas siguientes

router.get("/user/:id", rentalController.getAllByUserId);
router.get("/motorcycle/:motorcycleId", rentalController.getAllByMotorcycleId);
router.get("/rental/:id", rentalController.getById);
router.post("/", rentalController.create);
router.put("/:id", rentalController.update);
router.delete("/:id", rentalController.delete);

module.exports = router;
