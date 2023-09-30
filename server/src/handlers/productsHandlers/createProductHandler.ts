import { Request, Response } from "express";
import Products from "../../models/products";

const createProductHandler = async (req: Request, res: Response) => {
  try {
    const { name, description, backgroundImage, stock, price, categories } =
      req.body;

    const lowerCaseName = name.toLowerCase();

    const existingProduct = await Products.findOne({
      $or: [{ name: lowerCaseName }, { name: name }],
    });

    if (existingProduct) {
      return res.status(400).send("Ya existe un producto con este nombre.");
    }

    const newProduct = new Products({
      name: lowerCaseName,
      description,
      backgroundImage,
      stock,
      price,
      categories,
    });

    await newProduct.save();
    return res.send("Producto agregado exitosamente");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default createProductHandler;
