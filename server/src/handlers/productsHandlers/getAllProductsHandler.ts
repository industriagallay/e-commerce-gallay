import { Request, Response, NextFunction } from "express";
import getAllProductsController from "../../controllers/productsControllers/getAllProductsController";

const getAllProductsHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    await getAllProductsController(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el controlador");
  }
};

export default getAllProductsHandler;
