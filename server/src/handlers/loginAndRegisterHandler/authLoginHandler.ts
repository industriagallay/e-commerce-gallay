import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Clients from "../../models/clients";

const authLoginHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log({ a: req.body });
  const { email, password }: { email?: string; password?: string } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send("Debes proporcionar un email y contraseña");
    }

    // Verificar las credenciales del usuario
    const existingClient = await Clients.findOne({ email });

    if (!existingClient) {
      return res.status(404).send("Cliente no encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, existingClient.password);

    if (!isPasswordValid) {
      return res.status(401).send("Contraseña incorrecta");
    }

    // Las credenciales son válidas, generar el token JWT
    const token = jwt.sign(
      { clientId: existingClient._id, email: existingClient.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Enviar el token como parte de la respuesta
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default authLoginHandler;