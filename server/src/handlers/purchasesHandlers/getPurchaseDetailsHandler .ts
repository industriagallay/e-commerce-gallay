import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const getPurchaseDetailsHandler = async (req: Request, res: Response) => {
  const purchaseId = req.params.purchaseId;

  try {
    const purchase = await Purchases.findById(purchaseId);

    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    res.json(purchase);
  } catch (error) {
    console.error("Error al obtener los detalles de la compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default getPurchaseDetailsHandler;
