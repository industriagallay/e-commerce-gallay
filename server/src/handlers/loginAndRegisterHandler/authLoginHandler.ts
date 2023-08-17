import { Request, Response, NextFunction } from "express";
import { createAccessToken } from "../../libs/jwt";
import bcrypt from "bcryptjs";
import Clients from "../../models/clients";

const authLoginHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const clientFound = await Clients.findOne({ email });

    if (!clientFound)
      return res.status(400).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, clientFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "contraseña incorrecta" });

    const token = await createAccessToken({
      email: clientFound.email,
      _id: clientFound._id,
      firstName: clientFound.firstName,
      lastName: clientFound.lastName,
      dni: clientFound.dni,
      createdAt: clientFound.createdAt,
      updatedAt: clientFound.updatedAt,
      isAdmin: clientFound.isAdmin,
    });
    res.cookie("token", token);
    return res.json({
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default authLoginHandler;
