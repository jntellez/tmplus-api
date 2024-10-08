// src/routes/rentals.js
const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");

router.get("/", rentalController.getAll);
router.get("/:id", rentalController.getById);
router.post("/", rentalController.create);
router.put("/:id", rentalController.update);
router.delete("/:id", rentalController.delete);

module.exports = router;
