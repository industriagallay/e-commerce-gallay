import { Router } from "express";
import getAllPurchasesHandler from "../handlers/purchasesHandlers/getAllPurchasesHandler";
import getPurchasesByClientHandler from "../handlers/purchasesHandlers/getPurchasesByClientHandler";
import updateStatusHandler from "../handlers/purchasesHandlers/updateStatusHandler";
import getPurchasesByStatus from "../handlers/purchasesHandlers/getPurchasesByStatus";
import addProductToPurchaseHandler from "../handlers/purchasesHandlers/addProductToPurchaseHandler";
import deleteProductToPurchaseHandler from "../handlers/purchasesHandlers/deleteProductToPurchaseHandler";
import createPurchaseByClientIdHandler from "../handlers/purchasesHandlers/createPurchaseByClientIdHandler";
import cancelPurchaseByClientIdHandler from "../handlers/purchasesHandlers/cancelPurchaseByClientIdHandler";

export const purchasesRouter = Router();

purchasesRouter.get("/", getAllPurchasesHandler);
purchasesRouter.get("/:clientId", getPurchasesByClientHandler);
purchasesRouter.put("/:purchaseId/status", updateStatusHandler);
purchasesRouter.get("/status/:status", getPurchasesByStatus);
purchasesRouter.post("/:clientId/products", addProductToPurchaseHandler);
purchasesRouter.delete(
  "/:clientId/products/:productId",
  deleteProductToPurchaseHandler
);
purchasesRouter.post("/:clientId", createPurchaseByClientIdHandler);
purchasesRouter.put("/:clientId/cancel", cancelPurchaseByClientIdHandler);

export default purchasesRouter;
