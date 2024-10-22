const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).json({ message: "Token no proporcionado" });

  const token = authHeader.split(" ")[1]; // Extrae el token del encabezado
  if (!token)
    return res.status(403).json({ message: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido", error });
  }
};

module.exports = verifyToken;
