import { Request, Response } from "express";
import Clients from "../models/clients";

const getClientByQueryController = async (req: Request, res: Response) => {
  try {
    const filtro = { ...req.query };
    console.log("filtro (por query):", filtro);

    const cliente = await Clients.findOne(filtro);

    if (cliente) {
      console.log({ cliente });
      return res.json(cliente);
    } else {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar el cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default getClientByQueryController;
