import mongoose, { Schema } from "mongoose";
import { randomUUID } from "crypto";

const clientSchema = new Schema(
  {
    id: {
      type: "UUID",
      default: () => randomUUID(),
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Clients = mongoose.model("Clients", clientSchema);

export default Clients;
