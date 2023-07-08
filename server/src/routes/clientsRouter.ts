import { Router } from "express";
import getAllClientsHandler from "../handlers/getAllClientsHandler";

export const clientsRouter = Router();

clientsRouter.get("/", getAllClientsHandler);

export default clientsRouter;
