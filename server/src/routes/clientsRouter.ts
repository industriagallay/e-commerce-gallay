import { Router } from "express";
import getAllClientsHandler from "../handlers/clientsHandlers/getAllClientsHandler";
import getClientByIdHandler from "../handlers/clientsHandlers/getClientByIdHandler";
import findClientByDniOrEmailHandler from "../handlers/clientsHandlers/clientByemailOrDniController";
import updateClientHandler from "../handlers/clientsHandlers/updateClientHandler";
import deleteClientHandler from "../handlers/clientsHandlers/deleteClientHandler";

export const clientsRouter = Router();

clientsRouter.get("/allclient", getAllClientsHandler);
clientsRouter.get("/", findClientByDniOrEmailHandler);
clientsRouter.get("/:id", getClientByIdHandler);
clientsRouter.put("/update/:id", updateClientHandler);
clientsRouter.delete("/delete/:id", deleteClientHandler);

export default clientsRouter;
