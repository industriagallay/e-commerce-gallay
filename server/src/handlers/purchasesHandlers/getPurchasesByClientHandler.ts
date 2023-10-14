import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const getPurchasesByClientHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  try {
    const purchases = await Purchases.find({
      idClient: clientId,
      status: "inCart",
    });

    const updatedPurchases = purchases.map((purchase) => {
      const totalPrice = purchase.products.reduce((total, product) => {
        return total + product.price;
      }, 0);

      purchase.totalPrice = totalPrice;
      return purchase;
    });

    await Promise.all(updatedPurchases.map((purchase) => purchase.save()));

    res.json(updatedPurchases);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener y actualizar las compras del cliente" });
  }
};

export default getPurchasesByClientHandler;
