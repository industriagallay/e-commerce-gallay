import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const generateNewPurchaseHandler = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  const { totalPrice } = req.body;
  try {
    let purchaseToUpdate = await Purchases.findOne(
      {
        idClient: clientId,
        status: "inCart",
        totalPrice,
      },
      { $sort: { createdAt: -1 } }
    );
    if (!purchaseToUpdate || !purchaseToUpdate._id) {
      res.status(500).json({ message: "no existe la compra" });
    }
    await Purchases.findByIdAndUpdate(
      purchaseToUpdate?._id,
      { status: "pending pay" },
      { new: true }
    );

    const purchase = await Purchases.create({
      idClient: clientId,
      totalPrice: 0,
      status: "inCart",
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.error("Error en createPurchaseByClientIdHandler:", error);
    res.status(500).json({ error });
  }
};

export default generateNewPurchaseHandler;
