import { Request, Response, NextFunction } from "express";
import getClientByIdController from "../../controllers/clientsControllers/getClientByIdController";

const getClientByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getClientByIdController(req, res);
  } catch (error) {
    console.error(error);
    return next(new Error("Error en el controlador"));
  }
};

export default getClientByIdHandler;
