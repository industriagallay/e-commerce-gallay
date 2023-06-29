import { Request, Response } from "express";

const authLoginHandler = (_req: Request, res: Response) => {
  try {
    return res.send("Hola soy el backend del jonsi, aca devuelvo el login");
  } catch (error) {
    console.error(error);
  }
};

export default authLoginHandler;
