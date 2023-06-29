import { Request, Response, NextFunction } from "express";
import getAllClientsController from "../controllers/getAllClientsController";

const getAllClientsHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  getAllClientsController(req, res);
};

export default getAllClientsHandler;
