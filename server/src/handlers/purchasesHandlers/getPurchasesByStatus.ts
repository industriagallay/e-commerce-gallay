import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const getPurchasesByStatus = async (req: Request, res: Response) => {
  const status = req.body.status;

  try {
    const purchases = await Purchases.find({ status });
    res.json(purchases);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las compras según el estado" });
  }
};

export default getPurchasesByStatus;
