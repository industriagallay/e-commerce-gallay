import { Request, Response, NextFunction } from "express";
import getAllClientsController from "../controllers/getAllClientsController";

const getAllClientsHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    await getAllClientsController(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el controlador");
  }
};

export default getAllClientsHandler;
