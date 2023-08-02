import fs from "fs";
import { generateRandomSecret } from "./JwtSecret";

const newSecret = generateRandomSecret();
console.log(`Nuevo secreto generado: ${newSecret}`);

// Leer el archivo .env
const envFilePath = ".env";
const envData = fs.readFileSync(envFilePath, "utf8");

// Actualizar el valor de JWT_SECRET en el archivo .env
const updatedEnvData = envData.replace(
  /JWT_SECRET=.*$/,
  `JWT_SECRET="${newSecret}"`
);

// Guardar el archivo actualizado
fs.writeFileSync(envFilePath, updatedEnvData);
