import { Request, Response } from "express";
import { Types } from "mongoose";
import Clients from "../../models/clients";

const getClientByIdController = async (req: Request, res: Response) => {
  const clienteId = req.params.id;

  try {
    const filtro = { _id: new Types.ObjectId(clienteId) };
    console.log("filtro (por ID):", filtro);

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

export default getClientByIdController;
