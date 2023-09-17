import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const deletePurchaseByClientId = async (req: Request, res: Response) => {
  const clientId: string = req.params.clientId;
  try {
    const deletedPurchase = await Purchases.findOneAndDelete({ _id: clientId });

    if (!deletedPurchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    res.json({ message: "Compra borrada exitosamente" });
  } catch (error) {
    console.error("Error al borrar la compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default deletePurchaseByClientId;
