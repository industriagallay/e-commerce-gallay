import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/secret";

interface PayloadType {
  // Define the properties of the payload object here
  // For example:
  // userId: string;
  // username: string;
  [key: string]: any;
}

export const createAccessToken = (payload: PayloadType): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(token ?? "");
        }
      }
    );
  });
};
