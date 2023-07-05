import { Router } from "express";
import clientsRouter from "./clientsRouter";
import authRegisterRouter from "./authRegisterRouter";
import authLoginRouter from "./authLoginRouter";
import productsRouter from "./productsRouter";

const mainRouter = Router();

mainRouter.use("/clients", clientsRouter);
mainRouter.use("/api/register", authRegisterRouter);
mainRouter.use("/api/login", authLoginRouter);
mainRouter.use("/products", productsRouter);

export default mainRouter;
