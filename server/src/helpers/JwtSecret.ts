import crypto from "crypto";

export const generateRandomSecret = () => {
  const length = 64;
  const secret = crypto.randomBytes(length).toString("hex");
  console.log(`Secreto generado: ${secret}`);
  return secret;
};
