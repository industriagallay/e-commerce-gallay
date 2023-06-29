import { Router } from "express";
import clientsRouter from "./clientsRouter";
import authRegisterRouter from "./authRegisterRouter";
import authLoginRouter from "./authLoginRouter";

const mainRouter = Router();

mainRouter.use("/clients", clientsRouter);
mainRouter.use("/api/register", authRegisterRouter);
mainRouter.use("/api/login", authLoginRouter);

export default mainRouter;
