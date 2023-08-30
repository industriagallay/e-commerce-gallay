import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const generateNewPurchaseHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  const { products, totalPrice } = req.body;

  try {
    // Siempre generamos una nueva compra para el cliente
    const purchase = await Purchases.create({
      idClient: clientId,
      products,
      totalPrice,
      status: "pending pay",
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.error("Error en createPurchaseByClientIdHandler:", error);
    res.status(500).json({ error });
  }
};

export default generateNewPurchaseHandler;
