require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const motorcycleRoutes = require("./routes/motorcycles");
const rentalRoutes = require("./routes/rentals");
const ratingRoutes = require("./routes/ratings");
const authRoutes = require("./routes/authRoutes"); // Importar rutas de autenticación
const verifyToken = require("./middlewares/authMiddleware"); // Importar middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use("/api/users", userRoutes);
app.use("/api/motorcycles", motorcycleRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/auth", authRoutes); // Usar rutas de autenticación

// Ruta protegida de ejemplo
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "Acceso a ruta protegida" });
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API de Transporte Motorizado Plus (TMPlus)");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
