import crypto from "crypto";

export const generateRandomSecret = () => {
  const length = 64;
  return crypto.randomBytes(length).toString("hex");
};
