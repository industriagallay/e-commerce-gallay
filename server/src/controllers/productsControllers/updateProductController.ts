import Products from "../../models/products";

const updateProductController = async (
  productId: string,
  updatedClientData: any
) => {
  try {
    const existingProduct = await Products.findById(productId);

    if (!existingProduct) {
      throw new Error("Producto no encontrado");
    }

    existingProduct.name = updatedClientData.name;
    existingProduct.description = updatedClientData.description;
    existingProduct.backgroundImage = updatedClientData.backgroundImage;
    existingProduct.stock = updatedClientData.stock;
    existingProduct.price = updatedClientData.price;

    const updatedProduct = await existingProduct.save();

    return updatedProduct;
  } catch (error) {
    console.error("Error en la actualización del producto:", error);
    throw error;
  }
};

export default updateProductController;
