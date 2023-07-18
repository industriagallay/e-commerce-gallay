import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const getAllPurchasesHandler = async (_req: Request, res: Response) => {
  try {
    const purchases = await Purchases.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las compras" });
  }
};

export default getAllPurchasesHandler;
