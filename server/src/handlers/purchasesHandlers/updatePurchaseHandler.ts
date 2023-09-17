import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const updatePurchaseHandler = async (req: Request, res: Response) => {
  try {
    const purchasesId = req.params.purchasesId;
    const { totalPrice } = req.body;

    const purchase = await Purchases.findById(purchasesId);

    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    purchase.totalPrice = totalPrice;

    await purchase.save();

    res.json({ message: "Precio total actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el precio total:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default updatePurchaseHandler;
