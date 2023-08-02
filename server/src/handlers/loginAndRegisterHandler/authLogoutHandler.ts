import { Request, Response, NextFunction } from "express";

const authLogoutHandler = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default authLogoutHandler;
