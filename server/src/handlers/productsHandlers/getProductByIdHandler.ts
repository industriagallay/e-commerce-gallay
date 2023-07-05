import { Request, Response, NextFunction } from "express";
import getProductByIdController from "../../controllers/productsControllers/getProductByIdController";

const getProductByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getProductByIdController(req, res);
  } catch (error) {
    console.error(error);
    return next(new Error("Error en el controlador"));
  }
};

export default getProductByIdHandler;
