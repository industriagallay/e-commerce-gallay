import { Request, Response } from "express";
import Purchases from "../../models/purchases";

const updateStatusHandler = async (req: Request, res: Response) => {
  const purchasesId = req.params.purchasesId;
  const newStatus = req.body.status;
  console.log("Request received with ID:", purchasesId);
  console.log("New status:", newStatus);

  try {
    const purchase = await Purchases.findByIdAndUpdate(
      purchasesId,
      { status: newStatus },
      { new: true }
    );
    console.log("Updated purchase:", purchase);
    res.json(purchase);
  } catch (error) {
    console.error("Error updating status:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar el estado de la compra" });
  }
};

export default updateStatusHandler;
