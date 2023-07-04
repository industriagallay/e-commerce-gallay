import mongoose, { Schema, Document, Model } from "mongoose";

export interface ClientDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ClientsModel = Model<ClientDocument>;

const clientSchema = new Schema(
  {
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
    dni: {
      type: Number,
      require: true,
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
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        delete ret.password;
      },
    },
  }
);

const Clients: ClientsModel = mongoose.model<ClientDocument, ClientsModel>(
  "Clients",
  clientSchema
);

export default Clients;
