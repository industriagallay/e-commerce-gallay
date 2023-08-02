import { Request, Response, NextFunction } from "express";
import Clients from "../../models/clients";
import { TOKEN_SECRET } from "../../config/secret";
import Jwt from "jsonwebtoken";

const authProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    console.log("Token recibido:", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "No se proporcionó un token de autenticación" });
    }

    // Verificar el token y extraer el ID del cliente
    const decodedToken: any = Jwt.verify(token, TOKEN_SECRET);
    const clientId = decodedToken._id;

    // Buscar al cliente en la base de datos usando el ID obtenido del token
    const clientFound = await Clients.findById(clientId);

    if (!clientFound) {
      return res.status(400).json({ message: "Cliente no encontrado" });
    }

    // Si el cliente es válido, lo puedes usar en lugar de req.cookies._id
    return res.json({
      _id: clientFound._id,
      firstName: clientFound.firstName,
      lastName: clientFound.lastName,
      email: clientFound.email,
      dni: clientFound.dni,
      createdAt: clientFound.createdAt,
      updatedAt: clientFound.updatedAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default authProfileHandler;
