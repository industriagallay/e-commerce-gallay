import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const cancelPurchaseByClientIdHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;

  try {
    const purchase = await Purchases.findOneAndUpdate(
      { idClient: clientId },
      { status: "canceled" },
      { new: true }
    );

    if (!purchase) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    res.json(purchase);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al cambiar el estado de la compra a "cancelada"' });
  }
};

export default cancelPurchaseByClientIdHandler;
