const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Registro de usuario
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generar el token JWT
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Token generado:", token); // Imprime el token generado
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

// Inicio de sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getAll(); // Obtener todos los usuarios
    const foundUser = user.find((u) => u.email === email);

    if (!foundUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // Generar el token JWT
    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el inicio de sesión", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
