import { Request, Response } from "express";
import Products from "../../models/products";

const deleteProductHandler = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).send("Error al eliminar el producto");
  }
};

export default deleteProductHandler;
