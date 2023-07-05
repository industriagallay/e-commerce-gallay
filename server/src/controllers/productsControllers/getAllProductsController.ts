import { Request, Response } from "express";
import Products from "../../models/products";

const getAllProductsController = async (_req: Request, res: Response) => {
  try {
    const products = await Products.find().exec();
    return res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los productos" });
  }
};

export default getAllProductsController;
