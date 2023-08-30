import { Request, Response } from "express";
import Products from "../../models/products";

const createProductHandler = async (req: Request, res: Response) => {
  try {
    const { name, description, backgroundImage, stock, price, categories } =
      req.body;
    console.log({ a: req.body });
    const newProduct = new Products({
      name,
      description,
      backgroundImage,
      stock,
      price,
      categories,
    });

    await newProduct.save();
    console.log(newProduct);
    return res.send("Producto agregado exitosamente");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default createProductHandler;
