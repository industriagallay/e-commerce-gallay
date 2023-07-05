import { Request, Response, NextFunction } from "express";
import Clients from "../../models/clients";

const authLoginHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password }: { email?: string; password?: string } = req.query;

  try {
    if (!email && !password) {
      return res.status(400).send("Debes proporcionar un email y contraseña");
    }

    const query: { email?: string; password?: string } = {};

    if (email) {
      query.email = email;
    }

    if (password) {
      query.password = password;
    }

    const existingClient = await Clients.findOne(query);

    if (!existingClient) {
      return res.status(404).send("Cliente no encontrado");
    }

    return res.status(200).json(existingClient);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default authLoginHandler;
