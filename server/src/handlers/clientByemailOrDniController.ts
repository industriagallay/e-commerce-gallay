import { Request, Response, NextFunction } from "express";
import Clients from "../models/clients";

const findClientByDniOrEmailHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, dni }: { email?: string; dni?: string } = req.query;

  try {
    if (!email && !dni) {
      return res.status(400).send("Debes proporcionar un email o DNI");
    }

    const query: { email?: string; dni?: string } = {};

    if (email) {
      query.email = email;
    }

    if (dni) {
      query.dni = dni;
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

export default findClientByDniOrEmailHandler;
