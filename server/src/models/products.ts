import mongoose, { Schema } from "mongoose";
import { randomUUID } from "crypto";

const productSchema = new Schema(
  {
    id: {
      type: "UUID",
      default: () => randomUUID(),
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", productSchema);

export default Products;
