import { Request, Response } from "express";
import Clients from "../models/clients";

const deleteClientHandler = async (req: Request, res: Response) => {
  const clientId = req.params.id;

  try {
    const updatedClient = await Clients.findByIdAndUpdate(
      clientId,
      { isActive: false },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Cliente desactivado exitosamente" });
  } catch (error) {
    console.error("Error al desactivar el cliente:", error);
    return res.status(500).send("Error al desactivar el cliente");
  }
};

export default deleteClientHandler;
