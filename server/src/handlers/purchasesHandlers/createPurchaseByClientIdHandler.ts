import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const createPurchaseByClientIdHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  const { products, totalPrice } = req.body;

  try {
    let purchase = await Purchases.findOne({ idClient: clientId });

    if (!purchase) {
      // si el cliente es nuevo, aca genero una nueva compra
      purchase = await Purchases.create({
        idClient: clientId,
        products,
        totalPrice,
        status: "pending pay",
      });
    } else {
      // si ya existe el cliente y esta con una compra abierta, nomas voy a agregar los productos que ya eligio a la compra
      purchase.products.push(...products);
      purchase.totalPrice += totalPrice;
      purchase.updatedAt = new Date();
      purchase.status = "pending pay";
      await purchase.save();
    }

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: "Error al generar o actualizar la compra" });
  }
};

export default createPurchaseByClientIdHandler;
