import { Request, Response } from "express";
import updateProductController from "../../controllers/productsControllers/updateProductController";

const updateProductHandler = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const updatedClientData = req.body;

  try {
    const updatedProduct = await updateProductController(
      productId,
      updatedClientData
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en la actualización del cliente");
  }
};

export default updateProductHandler;
