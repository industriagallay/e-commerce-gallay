import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const closePurchaseHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  console.log({ back: clientId });

  try {
    const purchases = await Purchases.find({ idClient: clientId });

    if (purchases.length === 0) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    for (const purchase of purchases) {
      purchase.status = "closed";
      await purchase.save();
    }

    res.json({ message: "Compras cerradas exitosamente" });
  } catch (error) {
    console.error("Error al cerrar la compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default closePurchaseHandler;
