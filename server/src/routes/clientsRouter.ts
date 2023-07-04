import { Router } from "express";
import getAllClientsHandler from "../handlers/getAllClientsHandler";
import getClientByIdHandler from "../handlers/getClientByIdHandler";
import findClientByDniOrEmailHandler from "../handlers/clientByemailOrDniController";
import updateClientHandler from "../handlers/updateClientHandler";
import deleteClientHandler from "../handlers/deleteClientHandler";

export const clientsRouter = Router();

clientsRouter.get("/allclient", getAllClientsHandler);
clientsRouter.get("/", findClientByDniOrEmailHandler);
clientsRouter.get("/:id", getClientByIdHandler);
clientsRouter.put("/update/:id", updateClientHandler);
clientsRouter.delete("/delete/:id", deleteClientHandler);

export default clientsRouter;
