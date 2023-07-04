import { Router } from "express";
import getAllClientsHandler from "../handlers/getAllClientsHandler";
import getClientByIdHandler from "../handlers/getClientByIdHandler";
import findClientByDniOrEmailHandler from "../handlers/clientByemailOrDniController";

export const clientsRouter = Router();

clientsRouter.get("/allclient", getAllClientsHandler);
clientsRouter.get("/", findClientByDniOrEmailHandler);
clientsRouter.get("/:id", getClientByIdHandler);

export default clientsRouter;
