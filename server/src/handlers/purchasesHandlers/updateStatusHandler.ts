import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const updateStatusHandler = async (req: Request, res: Response) => {
  const purchaseId = req.params.purchaseId;
  const newStatus = req.body.status;

  try {
    const purchase = await Purchases.findByIdAndUpdate(
      purchaseId,
      { status: newStatus },
      { new: true }
    );
    res.json(purchase);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar el estado de la compra" });
  }
};

export default updateStatusHandler;
