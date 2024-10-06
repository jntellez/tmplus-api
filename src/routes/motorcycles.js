// src/routes/motorcycles.js
const express = require("express");
const router = express.Router();
const motorcycleController = require("../controllers/motorcycleController");

router.get("/", motorcycleController.getAll);
router.get("/:id", motorcycleController.getById);
router.post("/", motorcycleController.create);
router.put("/:id", motorcycleController.update);
router.delete("/:id", motorcycleController.delete);

module.exports = router;
