import { Request, Response, NextFunction } from "express";
import Products from "../../models/products";

const getProductsByNameHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log({ a: req.query });
  const { name }: { name?: string } = req.query;
  try {
    if (!name || name.trim() === '') {
      return res.status(400).send("Debes proporcionar un nombre");
    }

    const existingProducts = await Products.find({ name });

    if (existingProducts.length === 0) {
      return res.status(404).send("Producto no encontrado");
    }

    return res.status(200).json(existingProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default getProductsByNameHandler;
