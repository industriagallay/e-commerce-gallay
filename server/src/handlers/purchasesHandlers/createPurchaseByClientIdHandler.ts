import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const createPurchaseByClientIdHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  const { products, totalPrice } = req.body;

  try {
    let purchase = await Purchases.findOne({
      idClient: clientId,
      status: "inCart",
    });

    if (!purchase) {
      purchase = await Purchases.create({
        idClient: clientId,
        products,
        totalPrice,
        status: "inCart",
      });
    } else {
      purchase.products.push(...products);
      purchase.idClient = clientId;
      purchase.totalPrice += totalPrice;
      purchase.updatedAt = new Date();
      purchase.status = "inCart";
      await purchase.save();
    }

    res.status(201).json(purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al generar o actualizar la compra" });
  }
};

export default createPurchaseByClientIdHandler;
