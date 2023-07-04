import { Router } from "express";
import getAllClientsHandler from "../handlers/getAllClientsHandler";
import getClientByIdHandler from "../handlers/getClientByIdHandler";
import getClientByQueryHandler from "../handlers/getClientByQueryHandler";

export const clientsRouter = Router();

clientsRouter.get("/", getAllClientsHandler);
clientsRouter.get("/", getClientByIdHandler);
clientsRouter.get("/:id", getClientByQueryHandler);

export default clientsRouter;
