import { Request, Response, NextFunction } from "express";
import Clients from "../../models/clients";

const authLoginHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log({ a: req.body });
  const { email, password }: { email?: string; password?: string } = req.body;

  try {
    if (!email && !password) {
      return res.status(400).send("Debes proporcionar un email y contraseña");
    }

    const body: { email?: string; password?: string } = {};

    if (email) {
      body.email = email;
    }

    if (password) {
      body.password = password;
    }

    const existingClient = await Clients.findOne(body);

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
