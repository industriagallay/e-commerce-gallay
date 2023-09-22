import { Request, Response } from "express";
import Clients from "../../models/clients";

const updateActiveClientHandler = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { isActive } = req.body;

  try {
    const updatedClient = await Clients.findByIdAndUpdate(
      clientId,
      { isActive },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    return res.status(200).json({ isActive: updatedClient.isActive });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default updateActiveClientHandler;
