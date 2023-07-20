import { Request, Response } from "express";
import ClientModel from "../../models/clients";

const getAllClientsController = async (_req: Request, res: Response) => {
  try {
    const clients = await ClientModel.find().exec();
    return res.json(clients);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    return res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los clientes" });
  }
};

export default getAllClientsController;
