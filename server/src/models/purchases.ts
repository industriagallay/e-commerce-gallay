import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    idClient: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["inCart", "pending pay", "paid", "sent", "submitted", "canceled"],
      default: "inCart",
    },
  },
  { timestamps: true }
);

const Purchases = mongoose.model("Purchase", purchaseSchema);

export default Purchases;
