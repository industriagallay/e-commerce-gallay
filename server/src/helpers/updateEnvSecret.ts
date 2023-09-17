import fs from "fs";
import { generateRandomSecret } from "./JwtSecret";

const newSecret = generateRandomSecret();
const envFilePath = ".env";
const envData = fs.readFileSync(envFilePath, "utf8");
const updatedEnvData = envData.replace(
  /JWT_SECRET=.*$/,
  `JWT_SECRET="${newSecret}"`
);
fs.writeFileSync(envFilePath, updatedEnvData);
