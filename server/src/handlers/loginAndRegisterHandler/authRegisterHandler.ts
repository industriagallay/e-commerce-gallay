import { Request, Response } from "express";
import Clients from "../../models/clients";

const authRegisterHandler = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, dni, phone, password, isAdmin } =
      req.body;

    const newClient = new Clients({
      firstName,
      lastName,
      email,
      dni,
      phone,
      password,
      isAdmin,
    });

    await newClient.save();

    return res.send("Cliente registrado exitosamente");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default authRegisterHandler;
