import { Router } from "express";
import getAllProductsHandler from "../handlers/productsHandlers/getAllProductsHandler";
import createProductHandler from "../handlers/productsHandlers/createProductHandler";
import getProductByIdHandler from "../handlers/productsHandlers/getProductByIdHandler";
import getProductsByNameHandler from "../handlers/productsHandlers/getProductsByNameHandler";
import updateProductHandler from "../handlers/productsHandlers/updateProductHandler";
import deleteProductHandler from "../handlers/productsHandlers/deleteProductHandler";

export const productsRouter = Router();

productsRouter.get("/", getAllProductsHandler);
productsRouter.post("/", createProductHandler);
productsRouter.get("/id/:id", getProductByIdHandler);
productsRouter.get("/name", getProductsByNameHandler);
productsRouter.put("/:id", updateProductHandler);
productsRouter.delete("/:id", deleteProductHandler);

export default productsRouter;
