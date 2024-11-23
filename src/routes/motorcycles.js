// routes/motorcycles.js
const express = require("express");
const router = express.Router();
const motorcycleController = require("../controllers/motorcycleController");
const verifyToken = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // Importa el middleware de multer

// Rutas públicas
router.get("/", motorcycleController.getAll);
router.get("/:id", motorcycleController.getById);

// Rutas de imágenes
router.post(
  "/:motorcycleId/images",
  verifyToken, // Verifica que el usuario esté autenticado
  upload.array("images", 5), // Permite hasta 5 imágenes a la vez
  motorcycleController.addImages
);
router.get("/:motorcycleId/images", motorcycleController.getImages);
router.delete(
  "/images/:imageId",
  verifyToken,
  motorcycleController.deleteImage
);

// Rutas protegidas
router.use(verifyToken);
router.post("/", motorcycleController.create);
router.get("/user/:userId", motorcycleController.getByUserId);
router.put("/:id", motorcycleController.update);
router.delete("/:id", motorcycleController.delete);
router.get("/:id/rental-price", motorcycleController.getRentalPrice);

module.exports = router;
