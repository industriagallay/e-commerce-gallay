import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const getPurchasesByClientHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;

  try {
    const purchases = await Purchases.find({
      idClient: clientId,
      status: "pending pay",
     
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las compras del cliente" });
  }
};

export default getPurchasesByClientHandler;
