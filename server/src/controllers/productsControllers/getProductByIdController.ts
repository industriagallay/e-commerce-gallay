import { Request, Response } from "express";
import { Types } from "mongoose";
import Products from "../../models/products";

const getProductByIdController = async (req: Request, res: Response) => {
  const productId = req.params.id;
  console.log("productId:", req.params.id);

  try {
    const filtro = { _id: new Types.ObjectId(productId) };
    console.log("filtro (por ID):", filtro);

    const producto = await Products.findOne(filtro);

    if (producto) {
      console.log({ producto });
      return res.json(producto);
    } else {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar el producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default getProductByIdController;
