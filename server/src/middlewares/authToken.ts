import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Define una interfaz para extender la interfaz Request de Express
interface AuthenticatedRequest extends Request {
  client?: { clientId: string; email: string }; // Ajusta los tipos según los datos que almacenas en el token
}

// Middleware para proteger rutas
const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificar y decodificar el token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("No se ha proporcionado un secreto JWT");
    }

    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;

    req.client = {
      clientId: decodedToken.clientId,
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

export default authenticateToken;
