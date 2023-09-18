import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

interface DecodedToken {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  dni: number;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      decoded?: DecodedToken;
    }
  }
}

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No tienes token, autorizacion denegada" });
  }

  const decodedToken = Jwt.decode(token) as DecodedToken;
  if (!decodedToken) {
    return res.status(403).json({ message: "Token no valido" });
  }

  req.decoded = decodedToken;
  next();
};
