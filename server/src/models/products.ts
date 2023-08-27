import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
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
    categories: {
      type: String,
      enum: ["handle", "blade", "knife"],
      default: "knife",
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", productSchema);

export default Products;
