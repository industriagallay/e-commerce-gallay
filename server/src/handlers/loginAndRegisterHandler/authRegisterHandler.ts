import { Request, Response } from "express";
import Clients from "../../models/clients";
import { createAccessToken } from "../../libs/jwt";
import bcrypt from "bcryptjs";

const authRegisterHandler = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, dni, phone, password, isAdmin } =
      req.body;

    const existingEmail = await Clients.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "email_exists" });
    }

    const existingDNI = await Clients.findOne({ dni });
    if (existingDNI) {
      return res.status(409).json({ error: "dni_exists" });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const newClient = new Clients({
      firstName,
      lastName,
      email,
      dni,
      phone,
      password: passwordHashed,
      isAdmin,
    });

    await newClient.save();
    const token = await createAccessToken({
      firstName,
      lastName,
      email,
      dni,
      phone,
      isAdmin,
    });
    res.cookie("token", token);
    return res.json({
      firstName,
      lastName,
      email,
      dni,
      phone,
      isAdmin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default authRegisterHandler;
