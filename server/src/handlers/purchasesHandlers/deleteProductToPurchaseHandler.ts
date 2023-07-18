import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const deleteProductToPurchaseHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  const productId = req.params.productId;

  try {
    const purchase = await Purchases.findOne({ idClient: clientId });

    if (!purchase) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    const productIndex = purchase.products.findIndex(
      (product) => product.productId === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en la compra" });
    }

    purchase.products.splice(productIndex, 1);
    await purchase.save();

    res.json(purchase);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el producto de la compra" });
  }
};

export default deleteProductToPurchaseHandler;
