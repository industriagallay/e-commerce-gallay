import { Request, Response, NextFunction } from "express";
import Clients from "../../models/clients";

export const authCheckIsActiveHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email } = req.body;

  try {
    const clientFound = await Clients.findOne({ email });

    if (!clientFound) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    if (!clientFound.isActive) {
      return res.status(200).json({ isActive: false });
    }

    _next();
  } catch (error) {
    console.error("Error al verificar la activación del cliente:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
