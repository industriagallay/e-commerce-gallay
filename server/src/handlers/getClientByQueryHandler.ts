import { Request, Response, NextFunction } from "express";
import getClientByQueryController from "../controllers/getClientByQueryController";

const getClientByQueryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getClientByQueryController(req, res);
  } catch (error) {
    console.error(error);
    return next(new Error("Error en el controlador"));
  }
};

export default getClientByQueryHandler;
