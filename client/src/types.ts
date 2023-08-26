import { ReactNode } from "react";

// types.ts
export interface ProductGlobal {
  description: ReactNode;
  quantity: number;
  _id: string;
  name: string;
  backgroundImage: string;
  price: number;
  stock: number;

  // Agrega otros campos como price, stock, etc.
}
