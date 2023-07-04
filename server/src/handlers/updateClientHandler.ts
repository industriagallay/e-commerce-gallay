import { Request, Response } from "express";
import updateClientController from "../controllers/updateClientController";

const updateClientHandler = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  const updatedClientData = req.body;

  try {
    const updatedClient = await updateClientController(
      clientId,
      updatedClientData
    );

    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en la actualización del cliente");
  }
};

export default updateClientHandler;
