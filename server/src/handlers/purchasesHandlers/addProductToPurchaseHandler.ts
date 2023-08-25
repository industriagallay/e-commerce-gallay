import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const addProductToPurchaseHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  console.log({elClienteQueQuiereComprarEs: req.params.clienteId})
  const { productId, quantity, price } = req.body;
  console.log({ miProductoFrontendEs: req.body });
  try {
    const purchase = await Purchases.findOne({ idClient: clientId });

    if (!purchase) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    const newProduct = {
      productId,
      quantity,
      price,
    };

    purchase.products.push(newProduct);
    await purchase.save();

    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto a la compra" });
  }
};

export default addProductToPurchaseHandler;
